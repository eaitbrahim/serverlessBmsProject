const os = require('os');
const WebSocket = require('ws');

const performanceData = require('./performanceData');
//const syncLog = require('./syncLog');

const ws = new WebSocket(
  'wss://37be2u4eu1.execute-api.eu-central-1.amazonaws.com/dev'
);

const nI = os.networkInterfaces();
let MacA;
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
  // Initial read
  performanceData.getSystem().then(allPerformanceData => {
    allPerformanceData.MacA = MacA;
    allPerformanceData.action = 'system';
    if (allPerformanceData.BMSHWRSN !== '') {
      console.log(`${Date.now()} Sending system info to the server.`);
      ws.send(JSON.stringify(allPerformanceData));
    }
  });

  // start sending over data on interval
  let perfDataInterval = setInterval(() => {
    performanceData.getPrimaryData().then(allPerformanceData => {
      allPerformanceData.MacA = MacA;

      if (allPerformanceData.BMSHWRSN !== '') {
        allPerformanceData.performanceData.forEach(primaryData => {
          primaryData.action = 'primary-data';
          console.log(`${Date.now()} Sending primary data to the server`);
          ws.send(JSON.stringify(primaryData));
        });
      }
    });
  }, 5000);

  ws.on('close', function close() {
    clearInterval(perfDataInterval);
  });
});

ws.on('message', function incoming(data) {
  performanceData.setProcessedData(JSON.parse(data));
});
