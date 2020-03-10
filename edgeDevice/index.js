const os = require('os');
const WebSocket = require('ws');

const system = require('./system');
//const syncLog = require('./syncLog');

const ws = new WebSocket(
  'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev'
);

const nI = os.networkInterfaces();
let MacA;
let BMSHWRSN;
for (let key in nI) {
  if (!nI[key][0].internal) {
    if (nI[key][0].mac === '00:00:00:00:00:00') {
      MacA = Math.random()
        .toString(36)
        .substr(2, 15); // It's not a MacA but it's unique enough for testing purpose
    } else {
      MacA = nI[key][0].mac;
    }
    break;
  }
}

ws.on('open', function open() {
  // Send meta data
  system.getMetaData().then(metaData => {
    metaData.MacA = MacA;
    if (metaData.BMSHWRSN !== '') {
      BMSHWRSN = metaData.BMSHWRSN;
      metaData.action = 'meta-data';
      console.log(`${Date.now()} Sending meta data to the server.`);
      ws.send(JSON.stringify(metaData));
    }
  });

  // Send CAN Mapping
  system.getCanMapping().then(canMapping => {
    canMapping.BMSHWRSN = BMSHWRSN;
    canMapping.action = 'can-mapping';
    console.log(`${Date.now()} Sending can mapping to the server.`);
    ws.send(JSON.stringify(canMapping));
  });

  // Send primary data on interval
  let primaryDataInterval = setInterval(() => {
    system.getPrimaryData(BMSHWRSN).then(primaryData => {
      primaryData.performanceData.forEach(pd => {
        if (pd.BMSHWRSN !== '') {
          pd.action = 'primary-data';
          console.log(`${Date.now()} Sending primary data to the server.`);
          ws.send(JSON.stringify(pd));
        }
      });
    });
  }, 5000);

  ws.on('close', function close() {
    clearInterval(primaryDataInterval);
  });
});

ws.on('message', function incoming(data) {
  system.setProcessedData(JSON.parse(data));
});
