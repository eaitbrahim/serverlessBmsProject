const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;
  const body = JSON.parse(event.body);
  const {
    MacA,
    ConfigVer,
    BusinessUnit,
    EdgeHWRSN,
    EdgeSWRVer,
    BMSHWRSN,
    BMSSWRVer
  } = body;

  try {
    //Map connection id with a system
    const params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };
    const connection = await Dynamo.get(params);

    await Dynamo.writeConnection(
      {
        ...connection,
        System: BMSHWRSN
      },
      process.env.tableNameConnection
    );

    console.log('BMSHWRSN:', BMSHWRSN);

    // create new systen
    const data = {
      MacA,
      ConfigVer,
      BusinessUnit,
      EdgeHWRSN,
      EdgeSWRVer,
      BMSHWRSN,
      BMSSWRVer,
      IsOnline: true
    };

    console.log('data:', data);
    await Dynamo.write(data, process.env.tableNameSystem);
    return Response._200({ message: 'System online' });
  } catch (error) {
    return Responses._400({ message: `Error with system: ${error}` });
  }
};
