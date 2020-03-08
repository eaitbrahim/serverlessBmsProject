const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  try {
    //Map connection id with a system
    const params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };
    const connection = await Dynamo.get(params);

    const body = JSON.parse(event.body);
    await Dynamo.writeConnection(
      {
        ...connection,
        System: body.BMSHWRSN
      },
      process.env.tableNameConnection
    );

    // Insert meta data of the system
    const data = {
      ...body,
      IsOnline: true
    };

    await Dynamo.write(data, process.env.tableNameMetaData);

    return Responses._200({ message: `disconnected` });
  } catch (error) {
    return Responses._400({ message: 'disconnection could not be updated' });
  }
};
