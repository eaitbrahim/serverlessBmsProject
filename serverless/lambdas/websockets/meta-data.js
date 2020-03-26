const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const Dashboard = require('./dashboard');

exports.handler = async event => {
  console.log('event', event);

  try {
    // Insert meta data of the system
    const body = JSON.parse(event.body);
    const data = {
      ...body,
      IsOnline: true
    };

    await Dynamo.write(data, process.env.tableNameMetaData);

    // Send joined system to Dashboards
    await Dashboard.sendMessages({ BMSHWRSN: body.BMSHWRSN }, true);

    return Responses._200({ message: `meta data is done` });
  } catch (error) {
    console.log('Error: ', error);
    return Responses._400({ message: 'meta data could not be updated' });
  }
};
