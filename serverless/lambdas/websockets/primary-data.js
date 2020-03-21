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
      Message: data
    });

    // Send data to Dashboard
    const paramsForConnections = {
      TableName: process.env.tableNameConnection,
      IndexName: process.env.indexNameConnection,
      KeyConditionExpression: '#System = :System',
      ExpressionAttributeNames: { '#System': 'System' },
      ExpressionAttributeValues: {
        ':System': 'Dashboard'
      }
    };

    const connectedDashboards = await Dynamo.query(paramsForConnections);
    console.log('connectedDashboards:', connectedDashboards);
    const sendDataToDashboards = [];
    connectedDashboards.forEach(({ DomainName, Stage, ConnectionId }) => {
      sendDataToDashboards.push(
        WebSocket.send({
          DomainName,
          Stage,
          ConnectionId,
          Message: data
        })
      );
    });
    Promise.all(sendDataToDashboards);
    console.log('Data sent to all dashboars: ', connectedDashboards);

    return Responses._200({ message: 'New primary data' });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'primary data could not be received' });
  }
};
