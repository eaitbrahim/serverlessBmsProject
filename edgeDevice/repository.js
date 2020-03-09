class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  getMetaData() {
    console.log('Reading meta data...');
    return this.dao.all(`SELECT * FROM MetaData`, []);
  }

  getCanMapping() {
    console.log('Reading meta data...');
    return this.dao.all(`SELECT * FROM CANMapping`, []);
  }

  getNewPrimaryData() {
    console.log('Reading primary data...');
    return this.dao.all(
      `SELECT P.* FROM PrimaryData P INNER JOIN SyncLog S ON P.Id = S.PrimaryDataId WHERE S.Processing = 0 AND S.Processed = 0`,
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
      performanceData
    } = syncLog;
    return this.dao.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Processing=?, Processed=? WHERE SystemId = ? AND PrimaryDataId IN (${performanceData.join(
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
