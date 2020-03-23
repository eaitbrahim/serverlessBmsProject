const eventsData = [
  {
    type: 'Operating',
    state: [
      { bit: 0, definition: 'BMS_SAFETY_AINT' },
      { bit: 1, definition: 'MS_SAFETY_READY' },
      { bit: 2, definition: 'BMS_SAFETY_RUN' },
      { bit: 3, definition: 'BMS_SAFETY_SHUTDOWN' },
      { bit: 4, definition: 'BMS_SAFETY_SLEEP' },
      { bit: 5, definition: 'BMS_SAFETY_START' }
    ]
  },
  {
    type: 'Contactor',
    state: [
      { bit: 0, definition: 'BMS_SAFETY_OPEN' },
      { bit: 1, definition: 'MS_SAFETY_CLOSED' },
      { bit: 2, definition: 'MS_SAFETY_WAITING_OPEN' },
      { bit: 3, definition: 'BMS_SAFETY_PRECHARGE' }
    ]
  }
];

export default eventsData;
