export const BASE_URL = '/api/v1/server_metrics';
export const METRICS_URL = `${BASE_URL}/index`;
export const AVG_PER_HOUR_URL = `${BASE_URL}/avg_per_hour`;
export const AVG_PER_DAY_URL = `${BASE_URL}/avg_per_day`;

export const METRICS_FILTERS = {
  SEVEN_DAYS: '7D',
  THREE_DAYS: '3D',
  ONE_DAY: '24H',
  TWELVE_HOURS: '12H',
  ONE_HOUR: '1H',
};

export const METRICS_KEYS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  CPU_TEMP: 'cpu_temp',
  CPU_LOAD: 'cpu_load',
  DISK_LOAD: 'disk_load',
};
