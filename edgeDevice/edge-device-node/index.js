const os = require('os');
const isOnline = require('is-online');
const WebSocket = require('ws');

let isConnected = false;
let printInfoInterval;
let primaryDataInterval;
let ws;

liveCheck = async () => {
  let connectionStatus = await isOnline();

  if (connectionStatus && !isConnected) {
    console.log('Main app started...');
    isConnected = true;
    mainApp();
  }

  if (!connectionStatus) {
    clearIntervals();
    ws.terminate();
    isConnected = false;
    console.log('No connection to the internet.');
  }
};

setInterval(function () {
  liveCheck();
}, 5000);

mainApp = () => {
  if (isConnected) {
    const system = require('./system');

    const nI = os.networkInterfaces();
    let MacA;
    let BMSHWRSN;
    for (let key in nI) {
      if (!nI[key][0].internal) {
        if (nI[key][0].mac === '00:00:00:00:00:00') {
          MacA = Math.random().toString(36).substr(2, 15); // It's not a MacA but it's unique enough for testing purpose
        } else {
          MacA = nI[key][0].mac;
        }
        break;
      }
    }

    // Fetching meta data from db
    system.getMetaData().then((metaData) => {
      metaData.MacA = MacA;
      if (metaData.BMSHWRSN !== '') {
        BMSHWRSN = metaData.BMSHWRSN;
        metaData.action = 'meta-data';
        ws = new WebSocket(process.env.WSS_URL, {
          headers: { hostname: BMSHWRSN },
        });

        ws.on('open', function open() {
          console.log(
            `Websocket connection established for the system ${BMSHWRSN}`
          );
          // Send meta data
          console.log(`Sending meta data to the server.`);
          ws.send(JSON.stringify(metaData));
          // Send CAN Mapping
          system.getCanMapping().then((canMapping) => {
            canMapping.BMSHWRSN = BMSHWRSN;
            canMapping.action = 'can-mapping';
            console.log(`Sending can mapping to the server.`);
            ws.send(JSON.stringify(canMapping));
          });

          //Print info every 10 seconds
          printInfoInterval = setInterval(() => {
            console.log(
              `${new Date().toLocaleString()}: Sending primary data to the server...`
            );
          }, 10000);

          // Send primary data on interval
          primaryDataInterval = setInterval(() => {
            system.getPrimaryData(BMSHWRSN).then(({ primaryData }) => {
              primaryData.forEach((pd) => {
                pd.action = 'primary-data';
                // Send primary data to server
                ws.send(JSON.stringify(pd));
              });
            });
          }, 5000);

          ws.on('close', function close() {
            clearIntervals();
          });

          // Receive data from server
          ws.on('message', function incoming(data) {
            system.setProcessedData(JSON.parse(data));
          });
        });
      }
    });
  }
};

clearIntervals = () => {
  clearInterval(printInfoInterval);
  clearInterval(primaryDataInterval);
};
