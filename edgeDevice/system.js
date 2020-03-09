const AppDAO = require('./dao');
const Repository = require('./repository');

const dao = new AppDAO('./db/bms.db');
const repo = new Repository(dao);

const getMetaData = () => {
  return new Promise((resolve, reject) => {
    repo
      .getMetaData()
      .then(metaData => {
        console.log('fetched meta data: ', metaData);
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
        console.log('constructed data: ', data);
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
      .then(({ BMSHWRSN, performanceData }) => {
        if (performanceData.length > 0) {
          repo.updateSyncLog({
            BMSHWRSN,
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

const setProcessedData = data => {
  return new Promise((resolve, reject) => {
    repo.updateSyncLog({
      BMSHWRSN: data.BMSHWRSN,
      SyncDate: Date.now(),
      SyncComment: 'Processed',
      Processing: 1,
      Processed: 1,
      performanceData: [data.Id]
    });
  });
};

module.exports = { getMetaData, getPrimaryData, setProcessedData };
