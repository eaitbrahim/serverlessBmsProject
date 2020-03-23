const warningsData = [
  {
    byteNum: 'Byte 0',
    byteContent: [
      { bit: 1, name: 'WLV', definition: 'BMS_SAFETY_LOW_VOLTAGE_FAULT' },
      { bit: 2, name: 'WHV', definition: 'BMS_SAFETY_HIGH_VOLTAGE_FAULT' },
      {
        bit: 3,
        name: 'WHDC',
        definition: 'BMS_SAFETY_HIGH_DISCHARGE_CURRENT_FAULT'
      },
      {
        bit: 4,
        name: 'WHCC',
        definition: 'BMS_SAFETY_HIGH_CHARGE_CURRENT_FAULT'
      },
      { bit: 5, name: 'WLT', definition: 'BMS_SAFETY_LOW_TEMPERATURE_FAULT' },
      { bit: 6, name: 'WHT', definition: 'BMS_SAFETY_HIGH_TEMPERATURE_FAULT' },
      { bit: 7, name: 'WHDV', definition: 'BMS_SAFETY_VDIFF_FAULT' },
      { bit: 8, name: 'WHDT', definition: 'BMS_SAFETY_TDIFF_FAULT' }
    ]
  },
  {
    byteNum: 'Byte 1',
    byteContent: [
      { bit: 9, name: 'WHVDIFF', definition: 'BMS_SAFETY_HVDIFF_FAULT' },
      { bit: 10, name: 'WSF', definition: 'BMS_SAFETY_SENSOR_FAULT' },
      { bit: 11, name: 'WCF', definition: 'BMS_SAFETY_CONTACTOR_FAULT' },
      { bit: 12, name: 'WSHCF', definition: 'BMS_SAFETY_SHORT_CIRCUIT_FAULT' },
      { bit: 13, name: 'WPRE', definition: 'BMS_SAFETY_PRECHARGE_FAULT' },
      { bit: 14, name: 'WFUSE', definition: 'BMS_SAFETY_FUSE_FAULT' },
      { bit: 15, name: 'WSTCK', definition: 'BMS_SAFETY_STACKFIFF_FAULT' },
      { bit: 16, name: 'WAFE', definition: 'BMS_SAFETY_AFE_ALARM' }
    ]
  },
  {
    byteNum: 'Byte 2',
    byteContent: [
      { bit: 17, name: 'WI2C', definition: 'BMS_SAFETY_AFE_I2C_FAULT' },
      { bit: 18, name: 'NA', definition: 'NA' },
      { bit: 19, name: 'WCONFIG', definition: 'BMS_SAFETY_CONFIG_FAULT' },
      { bit: 20, name: 'WINPUT', definition: 'BMS_SAFETY_INPUT_ALARM' },
      { bit: 21, name: 'WEFLASH', definition: 'BMS_SAFETY_EXTFLASH_FAULT' },
      { bit: 22, name: 'WADC', definition: 'BMS_SAFETY_ADC_FAULT' },
      { bit: 23, name: 'WEXTRTC', definition: 'BMS_SAFETY_EXTRTC_FAULT' },
      { bit: 24, name: 'WCAN', definition: 'BMS_SAFETY_CAN_FAULT' }
    ]
  },
  {
    byteNum: 'Byte 3',
    byteContent: [
      { bit: 25, name: 'WTIMEOUT', definition: 'BMS_SAFETY_CAN_TIMEOUT' },
      { bit: 26, name: 'WSECURITY', definition: 'BMS_SAFETY_SECURITY' },
      { bit: 27, name: 'WDACCESS', definition: 'BMS_SAFETY_ACCESS' },
      { bit: 28, name: 'WSYSTEM', definition: 'BMS_SAFETY_SYSTEM_FAULT' },
      { bit: 29, name: 'WINTERLOCK', definition: 'BMS_SAFETY_INTERLOCK_FAULT' },
      { bit: 30, name: 'WTASK', definition: 'BMS_SAFETY_TASK_FAULT' },
      { bit: 31, name: 'WLOGIC', definition: 'BMS_SAFETY_LOGIC_FAULT' },
      { bit: 32, name: 'NA', definition: 'NA' }
    ]
  }
];

export default warningsData;
