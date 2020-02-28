class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  getSystemInfo(id) {
    console.log('Reading system info...');
    return this.dao.get(`SELECT * FROM System WHERE Id = ?`, [id]);
  }

  getNewPrimaryData() {
    console.log('Reading primary data...');
    return this.dao.all(
      `SELECT * FROM PrimaryData P INNER JOIN SyncLog S ON P.Id = S.PrimaryDataId WHERE S.Processing = 0 AND S.Processed = 0`,
      []
    );
  }

  updateSyncLog(syncLog) {
    console.log('Updating logs...');
    console.log('syncLog:', syncLog);
    const {
      BMSHWRSN,
      SyncDate,
      SyncComment,
      Processing,
      Processed,
      performanceData
    } = syncLog;
    return this.dao.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Processing=?, Processed=? WHERE SystemId = (SELECT Id From System WHERE BMSHWRSN=?) AND PrimaryDataId IN (${performanceData.join(
        ','
      )})`,
      [SyncDate, SyncComment, Processing, Processed, BMSHWRSN]
    );
  }

  deleteOldSyncLog(fromDate) {
    console.log('Deleting logs...');
    return this.dao.run(`DELETE FROM SyncLog WHERE SyncDate <= ?`, [fromDate]);
  }

  deleteOldPrimaryDate(fromDate) {
    console.log('Deleting old primary data...');
    return this.dao.run(`DELETE FROM PrimaryData WHERE CreatedAt <= ?`, [
      fromDate
    ]);
  }
}

module.exports = Repository;
