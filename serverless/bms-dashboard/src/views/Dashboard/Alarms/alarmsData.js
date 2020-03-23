const alarmsData = [
  {
    byteNum: 'Byte 0',
    byteContent: [
      { bit: 1, name: 'ALV', definition: 'BMS_SAFETY_LOW_VOLTAGE_FAULT' },
      { bit: 2, name: 'AHV', definition: 'BMS_SAFETY_HIGH_VOLTAGE_FAULT' },
      {
        bit: 3,
        name: 'AHDC',
        definition: 'BMS_SAFETY_HIGH_DISCHARGE_CURRENT_FAULT'
      },
      {
        bit: 4,
        name: 'AHCC',
        definition: 'BMS_SAFETY_HIGH_CHARGE_CURRENT_FAULT'
      },
      { bit: 5, name: 'ALT', definition: 'BMS_SAFETY_LOW_TEMPERATURE_FAULT' },
      { bit: 6, name: 'AHT', definition: 'BMS_SAFETY_HIGH_TEMPERATURE_FAULT' },
      { bit: 7, name: 'NA', definition: 'NA' },
      { bit: 8, name: 'NA', definition: 'NA' }
    ]
  },
  {
    byteNum: 'Byte 1',
    byteContent: [
      { bit: 9, name: 'AHVDIFF', definition: 'BMS_SAFETY_HVDIFF_FAULT' },
      { bit: 10, name: 'ASF', definition: 'BMS_SAFETY_SENSOR_FAULT' },
      { bit: 11, name: 'ACF', definition: 'BMS_SAFETY_CONTACTOR_FAULT' },
      { bit: 12, name: 'ASHCF', definition: 'BMS_SAFETY_SHORT_CIRCUIT_FAULT' },
      { bit: 13, name: 'APRE', definition: 'BMS_SAFETY_PRECHARGE_FAULT' },
      { bit: 14, name: 'AFUSE', definition: 'BMS_SAFETY_FUSE_FAULT' },
      { bit: 15, name: 'ASTCK', definition: 'BMS_SAFETY_STACKFIFF_FAULT' },
      { bit: 16, name: 'AAFE', definition: 'BMS_SAFETY_AFE_ALARM' }
    ]
  },
  {
    byteNum: 'Byte 2',
    byteContent: [
      { bit: 17, name: 'AI2C', definition: 'BMS_SAFETY_AFE_I2C_FAULT' },
      { bit: 18, name: 'NA', definition: 'NA' },
      { bit: 19, name: 'ACONFIG', definition: 'BMS_SAFETY_CONFIG_FAULT' },
      { bit: 20, name: 'AINPUT', definition: 'BMS_SAFETY_INPUT_ALARM' },
      { bit: 21, name: 'AEFLASH', definition: 'BMS_SAFETY_EXTFLASH_FAULT' },
      { bit: 22, name: 'AADC', definition: 'BMS_SAFETY_ADC_FAULT' },
      { bit: 23, name: 'NA', definition: 'NA' },
      { bit: 24, name: 'ACAN', definition: 'BMS_SAFETY_CAN_FAULT' }
    ]
  },
  {
    byteNum: 'Byte 3',
    byteContent: [
      { bit: 25, name: 'ATIMEOUT', definition: 'BMS_SAFETY_CAN_TIMEOUT' },
      { bit: 26, name: 'NA', definition: 'NA' },
      { bit: 27, name: 'NA', definition: 'NA' },
      { bit: 28, name: 'ASYSTEM', definition: 'BMS_SAFETY_SYSTEM_FAULT' },
      { bit: 29, name: 'AINTERLOCK', definition: 'BMS_SAFETY_INTERLOCK_FAULT' },
      { bit: 30, name: 'ATASK', definition: 'BMS_SAFETY_TASK_FAULT' },
      { bit: 31, name: 'ALOGIC', definition: 'BMS_SAFETY_LOGIC_FAULT' },
      { bit: 32, name: 'NA', definition: 'NA' }
    ]
  }
];

export default alarmsData;
