const os = require('os');
const WebSocket = require('ws');

const system = require('./system');

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

// Fetching meta data from db
system.getMetaData().then(metaData => {
  metaData.MacA = MacA;
  if (metaData.BMSHWRSN !== '') {
    BMSHWRSN = metaData.BMSHWRSN;
    metaData.action = 'meta-data';
    const ws = new WebSocket(
      'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev',
      {
        headers: { hostname: BMSHWRSN }
      }
    );

    ws.on('open', function open() {
      console.log(
        `Websocket connection established for the system ${BMSHWRSN}`
      );
      // Send meta data
      console.log(`Sending meta data to the server.`);
      ws.send(JSON.stringify(metaData));
      // Send CAN Mapping
      system.getCanMapping().then(canMapping => {
        canMapping.BMSHWRSN = BMSHWRSN;
        canMapping.action = 'can-mapping';
        console.log(`Sending can mapping to the server.`);
        ws.send(JSON.stringify(canMapping));
      });

      // Send primary data on interval
      console.log(`Sending primary data to the server...`);
      let primaryDataInterval = setInterval(() => {
        system.getPrimaryData(BMSHWRSN).then(({ primaryData }) => {
          primaryData.forEach(pd => {
            pd.action = 'primary-data';
            ws.send(JSON.stringify(pd));
          });
        });
      }, 5000);

      ws.on('close', function close() {
        clearInterval(primaryDataInterval);
      });

      // Receive data from server
      ws.on('message', function incoming(data) {
        system.setProcessedData(JSON.parse(data));
      });
    });
  }
});
