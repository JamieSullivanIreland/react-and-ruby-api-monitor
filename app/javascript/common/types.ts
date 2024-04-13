export interface ITableCell {
  key: string;
  label: any;
  classes?: string;
}

export interface ITableRow {
  id: string;
  cells: ITableCell[];
  classes?: string;
}

export interface ITableData {
  headerCells: ITableCell[];
  rows: ITableRow[];
}

export interface IServerMetric {
  id: string;
  cpuTemp: number;
  cpuLoad: number;
  diskLoad: number;
}

export interface IAverageMetric {
  label: string;
  cpu_temp_avg: number;
  cpu_load_avg: number;
  disk_load_avg: number;
}

export interface IPaginatedMetrics {
  results: IServerMetric[];
  totalItems: number;
  totalPages: number;
}
