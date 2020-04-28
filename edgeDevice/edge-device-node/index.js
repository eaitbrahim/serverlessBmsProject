const os = require('os');
const isOnline = require('is-online');
const WebSocket = require('ws');

let isConnected = false;
let primaryDataInterval;
let ws;
let terminateWebSocket = false;

heartbeat = async () => {
  let connectionStatus = await isOnline();

  if (connectionStatus && !isConnected) {
    isConnected = true;
    console.log(
      `${new Date().toLocaleString()}: Establishing a secure connection...`
    );
    renewWebSocket();
  }

  if (!connectionStatus) {
    console.log(
      `${new Date().toLocaleString()}: No connection to the internet.`
    );
    clearIntervals();
    isConnected = false;
    if (typeof ws !== 'undefined') terminateWebSocket = true;
  }
};

renewWebSocket = () => {
  if (terminateWebSocket) {
    ws.terminate();
    console.log(
      `${new Date().toLocaleString()}: terminating old connections...`
    );
    ws = new WebSocket(process.env.WSS_URL, {
      // ws = new WebSocket(
      //   'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev',
      //   {
      headers: { hostname: 'oldWS' },
    });
    ws.on('open', function open() {
      ws.close();
    });
    ws.on('close', function close() {
      mainApp();
    });
  } else {
    mainApp();
  }
};

setInterval(function () {
  heartbeat();
}, 5000);

mainApp = () => {
  console.log(`${new Date().toLocaleString()}: Main app started...`);
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
          // ws = new WebSocket(
          //   'wss://5xcuq4dlm1.execute-api.eu-central-1.amazonaws.com/dev',
          //   {
          headers: { hostname: BMSHWRSN },
        });

        ws.on('open', function open() {
          console.log(
            `${new Date().toLocaleString()}: Websocket connection established for the system ${BMSHWRSN}`
          );
          // Send meta data
          console.log(
            `${new Date().toLocaleString()}: Sending meta data to the server.`
          );
          ws.send(JSON.stringify(metaData));
          // Send CAN Mapping
          system.getCanMapping().then((canMapping) => {
            canMapping.BMSHWRSN = BMSHWRSN;
            canMapping.action = 'can-mapping';
            console.log(
              `${new Date().toLocaleString()}: Sending can mapping to the server.`
            );
            ws.send(JSON.stringify(canMapping));
          });

          // Send primary data on interval
          console.log(
            `${new Date().toLocaleString()}: Sending primary data to the server...`
          );

          primaryDataInterval = setInterval(() => {
            system.getPrimaryData(BMSHWRSN).then(({ primaryData }) => {
              primaryData.forEach((pd) => {
                pd.action = 'primary-data';
                ws.send(JSON.stringify(pd));
              });
            });
          }, process.env.PRIMARY_DATA_RATE);

          ws.on('close', function close() {
            console.log(
              `${new Date().toLocaleString()}: Websocket closed. Re-connect...`
            );
            terminateWebSocket = true;
            renewWebSocket();
          });

          ws.on('error', function (error) {
            console.log(`${new Date().toLocaleString()}: Error: ${error}`);
            terminateWebSocket = true;
            renewWebSocket();
          });

          // Receive data from server
          ws.on('message', function incoming(data) {
            try {
              const jData = JSON.parse(data);
              if ('BMSHWRSN' in jData && 'Id' in jData) {
                system.setProcessedData(jData);
              } else {
                console.log(
                  `${new Date().toLocaleString()}: data does not have ids: ${data}`
                );
                terminateWebSocket = true;
                renewWebSocket();
              }
            } catch (e) {
              console.log(
                `${new Date().toLocaleString()}: data is not JSON object: ${data}`
              );
              terminateWebSocket = true;
              renewWebSocket();
            }
          });
        });
      }
    });
  }
};

clearIntervals = () => {
  clearInterval(primaryDataInterval);
};
