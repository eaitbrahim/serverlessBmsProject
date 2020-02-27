const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  try {
    // Set system offline
    const { System } = await Dynamo.get(
      ConnectionId,
      process.env.tableNameConnection
    );

    const system = await Dynamo.get(System, process.env.tableNameSystem);

    const data = {
      ...system,
      IsOnline: false
    };

    await Dynamo.write(data, tableNameSystem);

    // Delete connection
    await Dynamo.delete(ConnectionId, process.env.tableNameConnection);
    return Responses._200({ message: `disconnected` });
  } catch (error) {
    return Responses._400({ message: 'disconnection could not be updated' });
  }
};
