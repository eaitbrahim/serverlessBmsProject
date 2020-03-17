const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  try {
    // Fetch system from connection
    let params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };

    const { System } = await Dynamo.get(params);

    // Delete connection
    await Dynamo.deleteConnection(
      ConnectionId,
      process.env.tableNameConnection
    );

    // Set system offline
    params = {
      TableName: process.env.tableNameMetaData,
      Key: {
        BMSHWRSN: System
      }
    };
    const system = await Dynamo.get(params);

    const data = {
      ...system,
      IsOnline: false
    };

    await Dynamo.write(data, process.env.tableNameMetaData);

    return Responses._200({ message: `disconnected` });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'disconnection could not be updated' });
  }
};
