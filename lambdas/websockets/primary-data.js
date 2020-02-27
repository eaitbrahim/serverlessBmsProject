const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: connectionID } = event.requestContext;

  const body = JSON.parse(event.body);
  const {
    Id,
    Localtime,
    HB1,
    SOC,
    SOCMax,
    SOCMin,
    IChgLimit,
    IDsgLimit,
    HB2,
    SOH,
    OpStatus,
    RlyStatus,
    VBattery,
    IBattery,
    VCellMin,
    VCellMinID,
    VCellMax,
    VCellMaxID,
    TModMin,
    TModAvg,
    TModMax,
    TModMinID,
    TModMaxID,
    HIBattery,
    Reserved,
    CreatedAt
  } = body;

  try {
    const data = {
      BMSHWRSN: connectionID,
      Id,
      Localtime,
      HB1,
      SOC,
      SOCMax,
      SOCMin,
      IChgLimit,
      IDsgLimit,
      HB2,
      SOH,
      OpStatus,
      RlyStatus,
      VBattery,
      IBattery,
      VCellMin,
      VCellMinID,
      VCellMax,
      VCellMaxID,
      TModMin,
      TModAvg,
      TModMax,
      TModMinID,
      TModMaxID,
      HIBattery,
      Reserved,
      CreatedAt
    };

    await Dynamo.write(data, process.env.tableNameData);
    return Response._200({ message: 'New primary data' });
  } catch (error) {
    return Responses._400({ message: 'primary data could not be received' });
  }
};
