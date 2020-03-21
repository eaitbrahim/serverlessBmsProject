const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const Dashboard = {
  async sendMessages(data, IsOnline = false) {
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
    for (const { DomainName, Stage, ConnectionId } of connectedDashboards) {
      await WebSocket.send({
        DomainName,
        Stage,
        ConnectionId,
        Message: { ...data, IsOnline }
      });
    }

    console.log('Data sent to all connected dashboars.');
  }
};

module.exports = Dashboard;
