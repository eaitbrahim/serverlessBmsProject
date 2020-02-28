const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

exports.handler = async event => {
  console.log('event', event);

  const { connectionId: ConnectionId } = event.requestContext;
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
    Reserved
  } = body;

  try {
    // Ftech current connection
    const params = {
      TableName: process.env.tableNameConnection,
      Key: {
        ConnectionId
      }
    };

    const { System, DomainName, Stage } = await Dynamo.get(params);

    // Insert primary data of the system
    const data = {
      BMSHWRSN: System,
      Id: String(Id),
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
      CreatedAt: Date.now()
    };

    await Dynamo.write(data, process.env.tableNameData);

    // Send confirmation to the sender
    await WebSocket.send({
      DomainName,
      Stage,
      ConnectionId,
      Message: { BMSHWRSN: data.BMSHWRSN, Id: parseInt(data.Id) }
    });

    console.log('message sent back!');
    return Response._200({ message: 'New primary data' });
  } catch (error) {
    return Responses._400({ message: 'primary data could not be received' });
  }
};
