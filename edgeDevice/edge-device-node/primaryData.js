const AppDAO = require('./dao');
const Repository = require('./repository');

const dao = new AppDAO('./db/bms.db');
const repo = new Repository(dao);

const generatedPrimaryData = [];
console.log('generating data...');
for (let i = 0; i < 100000; i++) {
  generatedPrimaryData.push({
    Localtime: Date.now(),
    HB1: Math.floor(Math.random() * 1000) + i,
    SOC: Math.floor(Math.random() * 100),
    SOCMax: Math.floor(Math.random() * 150) + 30,
    SOCMin: Math.floor(Math.random() * 10),
    IChgLimit: Math.floor(Math.random() * 1000) + i,
    IDsgLimit: Math.floor(Math.random() * 1000) + i,
    HB2: Math.floor(Math.random() * 1000) + i,
    SOH: Math.floor(Math.random() * 100),
    SOHMax: Math.floor(Math.random() * 150) + 30,
    SOHMin: Math.floor(Math.random() * 10),
    OpStatus: Math.floor(Math.random() * 6),
    RlyStatus: Math.floor(Math.random() * 4),
    VBattery: Math.floor(Math.random() * 1000) + i,
    IBattery: Math.floor(Math.random() * 1000) + i,
    VCellMin: Math.floor(Math.random() * 1000) + i,
    VCellMinID: Math.floor(Math.random() * 1000) + i,
    VCellMax: Math.floor(Math.random() * 1000) + i,
    VCellMaxID: Math.floor(Math.random() * 1000) + i,
    TModMin: Math.floor(Math.random() * 1000) + i,
    TModAvg: Math.floor(Math.random() * 1000) + i,
    TModMax: Math.floor(Math.random() * 1000) + i,
    TModMinID: Math.floor(Math.random() * 1000) + i,
    TModMaxID: Math.floor(Math.random() * 1000) + i,
    HIBattery: Math.floor(Math.random() * 1000) + i,
    reserved: Math.floor(Math.random() * 1000) + i,
    Alarms: Math.floor(Math.random() * 1000) + i,
    Warnings: Math.floor(Math.random() * 1000) + i,
    CreatedAt: Date.now(),
    SystemId: 'EigerC63B129'
  });
}

new Promise((resolve, reject) => {
  repo.createPrimaryData(generatedPrimaryData);
});
