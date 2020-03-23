const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  try {
    const params = {
      TableName: process.env.tableNameMetaData
    };

    const result = await Dynamo.getAll(params);

    if (!result) {
      return Responses._400({ message: 'Failed to get systems.' });
    }

    return Responses._200({ systems: result.map(s => s.BMSHWRSN) });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'Failed to get systems.' });
  }
};
