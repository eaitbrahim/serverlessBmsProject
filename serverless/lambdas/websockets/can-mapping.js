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

    // Insert meta can mapping of the system
    const body = JSON.parse(event.body);
    const data = {
      BMSHWRSN: System,
      ...body
    };

    await Dynamo.write(data, process.env.tableNameCanMapping);

    return Responses._200({ message: `disconnected` });
  } catch (error) {
    return Responses._400({ message: 'disconnection could not be updated' });
  }
};
