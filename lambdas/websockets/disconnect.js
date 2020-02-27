const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  try {
    // Set system offline
    let params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };

    const { System } = await Dynamo.get(params);

    params = {
      TableName: process.env.tableNameSystem,
      Key: {
        BMSHWRSN: System
      }
    };
    const system = await Dynamo.get(params);
    const data = {
      ...system,
      IsOnline: false
    };

    await Dynamo.write(data, process.env.tableNameSystem);

    // Delete connection
    await Dynamo.deleteConnection(
      ConnectionId,
      process.env.tableNameConnection
    );

    return Responses._200({ message: `disconnected` });
  } catch (error) {
    return Responses._400({ message: 'disconnection could not be updated' });
  }
};
