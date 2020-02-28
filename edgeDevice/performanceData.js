const AppDAO = require('./dao');
const Repository = require('./repository');

const data = {
  ConfigVer: '',
  BusinessUnit: '',
  EdgeHWRSN: '',
  EdgeSWRVer: '',
  BMSHWRSN: '',
  BMSSWRVer: '',
  performanceData: []
};

const dao = new AppDAO('./db/bms.db');
const repo = new Repository(dao);

const getSystem = () => {
  return new Promise((resolve, reject) => {
    repo
      .getSystemInfo(1)
      .then(system => {
        data.ConfigVer = system.ConfigVer;
        data.BusinessUnit = system.BusinessUnit;
        data.EdgeHWRSN = system.EdgeHWRSN;
        data.EdgeSWRVer = system.EdgeSWRVer;
        data.BMSHWRSN = system.BMSHWRSN;
        data.BMSSWRVer = system.BMSSWRVer;
        resolve(data);
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
        reject(err);
      });
  });
};

const getPrimaryData = () => {
  return new Promise((resolve, reject) => {
    repo
      .getNewPrimaryData()
      .then(newPrimaryData => {
        data.performanceData = [];
        newPrimaryData.forEach(d => {
          data.performanceData.push(d);
        });
        return data;
      })
      .then(({ performanceData }) => {
        if (performanceData.length > 0) {
          repo.updateSyncLog({
            SyncDate: Date.now(),
            SyncComment: 'Processing',
            Processing: 1,
            Processed: 0,
            performanceData: performanceData.map(d => d.Id)
          });
        }
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
        reject(err);
      });
    resolve(data);
  });
};

module.exports = { getSystem, getPrimaryData };
