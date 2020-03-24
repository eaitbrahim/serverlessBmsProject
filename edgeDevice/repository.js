class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  getMetaData() {
    console.log('Reading meta data...');
    return this.dao.all(`SELECT * FROM MetaData`, []);
  }

  getCanMapping() {
    console.log('Reading can mapping...');
    return this.dao.all(`SELECT * FROM CANMapping`, []);
  }

  getNewPrimaryData() {
    console.log('Reading primary data...');
    return this.dao.all(
      `SELECT * FROM PrimaryData WHERE Id NOT IN (SELECT PrimaryDataId FROM SyncLog)`,
      []
    );
  }

  createSyncLog(syncLog) {
    console.log('Creating logs...');
    const {
      BMSHWRSN,
      SyncDate,
      SyncComment,
      Processing,
      Processed,
      primaryData
    } = syncLog;
    const dataToInsert = primaryData.map(p => {
      return `('${BMSHWRSN}', ${p}, ${SyncDate}, '${SyncComment}', ${Processing}, ${Processed})`;
    });

    return this.dao.run(
      `INSERT INTO SyncLog (SystemId, PrimaryDataId, SyncDate, SyncComment, Processing, Processed) VALUES ${dataToInsert.join(
        ','
      )}`,
      []
    );
  }

  updateSyncLog(syncLog) {
    console.log('Updating logs...');
    const {
      BMSHWRSN,
      SyncDate,
      SyncComment,
      Processing,
      Processed,
      primaryData
    } = syncLog;
    return this.dao.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Processing=?, Processed=? WHERE SystemId = ? AND PrimaryDataId IN (${primaryData.join(
        ','
      )})`,
      [SyncDate, SyncComment, Processing, Processed, BMSHWRSN]
    );
  }

  deleteOldSyncLog(fromDate) {
    console.log('Deleting logs...');
    return this.dao.run(
      `DELETE FROM SyncLog WHERE SyncDate <= ? AND Processing = 1 AND Processed = 1`,
      [fromDate]
    );
  }

  deleteOldPrimaryDate(fromDate) {
    console.log('Deleting old primary data...');
    return this.dao.run(`DELETE FROM PrimaryData WHERE CreatedAt <= ?`, [
      fromDate
    ]);
  }
}

module.exports = Repository;
