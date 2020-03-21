const AppDAO = require('./dao');
const Repository = require('./repository');

const dao = new AppDAO('./db/bms.db');
const repo = new Repository(dao);

const getMetaData = () => {
  return new Promise((resolve, reject) => {
    repo
      .getMetaData()
      .then(metaData => {
        let data = { BMSHWRSN: '', Cluster: {} };
        metaData.forEach(md => {
          if (!data.Cluster[md.Cluster]) {
            data.Cluster[md.Cluster] = [];
          }
          data.Cluster[md.Cluster].push({ Key: md.Key, Value: md.Value });
          if (md.Key === 'BMSHWRSN') {
            data.BMSHWRSN = md.Value;
          }
        });
        resolve(data);
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
        reject(err);
      });
  });
};

const getCanMapping = () => {
  return new Promise((resolve, reject) => {
    repo
      .getCanMapping()
      .then(canMapping => {
        let data = { BMSHWRSN: '', CanMapping: [] };
        canMapping.forEach(cm => {
          data.CanMapping.push({ Key: cm.Key, Value: cm.Value, Unit: cm.Unit });
        });
        resolve(data);
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
        reject(err);
      });
  });
};

const getPrimaryData = BMSHWRSN => {
  return new Promise((resolve, reject) => {
    let data = { BMSHWRSN, primaryData: [] };
    repo
      .getNewPrimaryData()
      .then(newPrimaryData => {
        newPrimaryData.forEach(d => {
          data.primaryData.push(d);
        });
        return data;
      })
      .then(({ BMSHWRSN, primaryData }) => {
        if (primaryData.length > 0) {
          repo.createSyncLog({
            BMSHWRSN,
            SyncDate: Date.now(),
            SyncComment: 'Processing',
            Processing: 1,
            Processed: 0,
            primaryData: primaryData.map(d => d.Id)
          });

          resolve(data);
        }
      })
      .catch(err => {
        console.log(`Error: ${JSON.stringify(err)}`);
        reject(err);
      });
  });
};

const setProcessedData = data => {
  return new Promise((resolve, reject) => {
    repo.updateSyncLog({
      BMSHWRSN: data.BMSHWRSN,
      SyncDate: Date.now(),
      SyncComment: 'Processed',
      Processing: 1,
      Processed: 1,
      primaryData: [parseInt(data.Id)]
    });
  });
};

module.exports = {
  getMetaData,
  getCanMapping,
  getPrimaryData,
  setProcessedData
};
