const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const {
    connectionId: ConnectionId,
    domainName: DomainName,
    stage: Stage
  } = event.requestContext;

  const data = {
    ConnectionId,
    System: 'Dashboard',
    ConnectionDate: Date.now(),
    DomainName,
    Stage
  };

  await Dynamo.writeConnection(data, process.env.tableNameConnection);

  return Responses._200({ message: 'connected' });
};
