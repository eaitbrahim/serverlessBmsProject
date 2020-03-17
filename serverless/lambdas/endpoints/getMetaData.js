const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  try {
    const params = {
      TableName: process.env.tableNameMetaData,
      Key: {
        BMSHWRSN
      }
    };

    const metaData = await Dynamo.get(params);

    if (!metaData) {
      return Responses._400({ message: 'Failed to get meta data.' });
    }

    return Response._200({ metaData });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'Failed to get meta data.' });
  }
};
