const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);
  if (!event.pathParameters || !event.pathParameters.BMSHWRSN) {
    return Responses._400({ message: 'missing the BMSHWRSN from the path.' });
  }

  try {
    const params = {
      TableName: process.env.tableNameMetaData,
      Key: {
        BMSHWRSN: event.pathParameters.BMSHWRSN
      }
    };

    const metaData = await Dynamo.get(params);

    if (!metaData) {
      return Responses._400({ message: 'Failed to get meta data.' });
    }

    return Responses._200({ metaData });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'Failed to get meta data.' });
  }
};
