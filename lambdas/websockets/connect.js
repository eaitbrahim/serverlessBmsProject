const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;

  const data = {
    ConnectionId,
    System: 'Init',
    ConnectionDate: Date.now()
  };

  await Dynamo.writeConnection(data, process.env.tableNameConnection);

  return Responses._200({ message: 'connected' });
};
