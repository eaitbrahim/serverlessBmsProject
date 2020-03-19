const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);
  if (!event.pathParameters || !event.pathParameters.BMSHWRSN) {
    return Responses._400({ message: 'missing the BMSHWRSN from the path.' });
  }

  try {
    const BMSHWRSN = event.pathParameters.BMSHWRSN;
    const params = {
      TableName: process.env.tableNamePrimaryData,
      KeyConditionExpression: '#BMSHWRSN = :BMSHWRSN',
      ExpressionAttributeNames: {
        '#BMSHWRSN': 'BMSHWRSN'
      },
      ExpressionAttributeValues: {
        ':BMSHWRSN': BMSHWRSN
      },
      ScanIndexForward: false,
      Limit: 1
    };
    console.log('params:', params);
    const primaryData = await Dynamo.query(params);

    if (!primaryData) {
      return Responses._400({ message: 'Failed to get primary data.' });
    }

    return Responses._200({ primaryData: primaryData[0] });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'Failed to get primary data.' });
  }
};
