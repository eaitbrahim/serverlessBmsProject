const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  try {
    // Ftech current connection
    const params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };

    const { System, DomainName, Stage } = await Dynamo.get(params);

    // Insert primary data of the system
    const body = JSON.parse(event.body);
    const data = {
      BMSHWRSN: System,
      ReceivedDateTime: String(Date.now()),
      ...body
    };

    await Dynamo.write(data, process.env.tableNamePrimaryData);

    // Send confirmation to the sender
    await WebSocket.send({
      DomainName,
      Stage,
      ConnectionId,
      Message: { BMSHWRSN: data.BMSHWRSN, Id: parseInt(data.Id) }
    });

    return Response._200({ message: 'New primary data' });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'primary data could not be received' });
  }
};
