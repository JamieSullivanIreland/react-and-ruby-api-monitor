export const METRICS_URL = '/api/v1/server_metrics';
export const AVG_PER_HOUR_URL = `${METRICS_URL}/avg_per_hour`;
export const AVG_PER_DAY_URL = `${METRICS_URL}/avg_per_day`;

export const METRICS_FILTERS = {
  SEVEN_DAYS: '7 D',
  THREE_DAYS: '3 D',
  ONE_DAY: '1 D',
  TWELVE_HOURS: '12 H',
  SIX_HOURS: '6 H',
  ONE_HOUR: '1 H',
};

export const Data = [
  {
    id: 1,
    day: 'Mon',
    cpuTemp: 69,
    cpuLoad: 120.55,
    diskLoad: 123.33,
  },
  {
    id: 2,
    day: 'Tue',
    cpuTemp: 100,
    cpuLoad: 15,
    diskLoad: 150,
  },
  {
    id: 3,
    day: 'Wed',
    cpuTemp: 55,
    cpuLoad: 26,
    diskLoad: 13,
  },
  {
    id: 4,
    day: 'Thu',
    cpuTemp: 33,
    cpuLoad: 120.55,
    diskLoad: 123.33,
  },
  {
    id: 5,
    day: 'Fri',
    cpuTemp: 59,
    cpuLoad: 120.55,
    diskLoad: 123.33,
  },
  {
    id: 6,
    day: 'Sat',
    cpuTemp: 36,
    cpuLoad: 120.55,
    diskLoad: 123.33,
  },
  {
    id: 7,
    day: 'Sun',
    cpuTemp: 20,
    cpuLoad: 120.55,
    diskLoad: 123.33,
  },
];
