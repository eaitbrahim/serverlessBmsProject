class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  getMetaData() {
    return this.dao.all(`SELECT * FROM MetaData`, []);
  }

  getCanMapping() {
    return this.dao.all(`SELECT * FROM CANMapping`, []);
  }

  getNewPrimaryData() {
    return this.dao.all(
      `SELECT * FROM PrimaryData WHERE Id NOT IN (SELECT PrimaryDataId FROM SyncLog)`,
      []
    );
  }

  createSyncLog(syncLog) {
    const {
      BMSHWRSN,
      SyncDate,
      SyncComment,
      Processing,
      Processed,
      primaryData,
    } = syncLog;
    const dataToInsert = primaryData.map((p) => {
      return `('${BMSHWRSN}', ${p}, ${SyncDate}, '${SyncComment}', ${Processing}, ${Processed})`;
    });

    if (dataToInsert.length === 0) return;

    return this.dao.run(
      `INSERT INTO SyncLog (SystemId, PrimaryDataId, SyncDate, SyncComment, Processing, Processed) VALUES ${dataToInsert.join(
        ','
      )}`,
      []
    );
  }

  createPrimaryData(primaryData) {
    const dataToInsert = primaryData.map((p) => {
      return `(
      '${p.Localtime}', 
      ${p.HB1}, 
      ${p.SOC},
      ${p.SOCMax},
      ${p.SOCMin},
      ${p.IChgLimit},
      ${p.IDsgLimit},
      ${p.HB2},
      ${p.SOH},
      ${p.SOHMax},
      ${p.SOHMin},
      ${p.OpStatus},
      ${p.RlyStatus},
      ${p.VBattery},
      ${p.IBattery},
      ${p.VCellMin},
      ${p.VCellMinID},
      ${p.VCellMax},
      ${p.VCellMaxID},
      ${p.TModMin},
      ${p.TModAvg},
      ${p.TModMax},
      ${p.TModMinID},
      ${p.TModMaxID},
      ${p.HIBattery},
      ${p.reserved},
      ${p.Alarms},
      ${p.Warnings},
      '${p.CreatedAt}',
      '${p.SystemId}'
      )`;
    });

    if (dataToInsert.length === 0) return;

    return this.dao.run(
      `INSERT INTO PrimaryData (
        Localtime,
        HB1,
        SOC,
        SOCMax,
        SOCMin,
        IChgLimit,
        IDsgLimit,
        HB2,
        SOH,
        SOHMax,
        SOHMin,
        OpStatus,
        RlyStatus,
        VBattery,
        IBattery,
        VCellMin,
        VCellMinID,
        VCellMax,
        VCellMaxID,
        TModMin,
        TModAvg,
        TModMax,
        TModMinID,
        TModMaxID,
        HIBattery,
        reserved,
        Alarms,
        Warnings,
        CreatedAt,
        SystemId) VALUES ${dataToInsert.join(',')}`,
      []
    );
  }

  updateSyncLog(syncLog) {
    const {
      BMSHWRSN,
      SyncDate,
      SyncComment,
      Processing,
      Processed,
      primaryData,
    } = syncLog;

    if (primaryData.length === 0) return;
    return this.dao.run(
      `UPDATE SyncLog SET SyncDate=?, SyncComment=?, Processing=?, Processed=? WHERE SystemId = ? AND PrimaryDataId IN (${primaryData.join(
        ','
      )})`,
      [SyncDate, SyncComment, Processing, Processed, BMSHWRSN]
    );
  }

  deleteOldSyncLog(fromDate) {
    return this.dao.run(
      `DELETE FROM SyncLog WHERE SyncDate <= ? AND Processing = 1 AND Processed = 1`,
      [fromDate]
    );
  }

  deleteOldPrimaryDate(fromDate) {
    return this.dao.run(`DELETE FROM PrimaryData WHERE CreatedAt <= ?`, [
      fromDate,
    ]);
  }
}

module.exports = Repository;
