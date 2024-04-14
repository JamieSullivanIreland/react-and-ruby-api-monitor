export interface ITableCell {
  key: string;
  label: any;
  classes?: string;
  isSortable?: boolean;
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
  id?: string;
  cpu_temp: number;
  cpu_load: number;
  disk_load: number;
}

export interface IAverageMetric {
  label: string;
  cpu_temp_avg: number;
  cpu_load_avg: number;
  disk_load_avg: number;
}

export interface IMetricFormErrors {
  cpu_temp: string;
  cpu_load: string;
  disk_load: string;
}

export interface IPaginatedMetrics {
  results: IServerMetric[];
  totalItems: number;
  totalPages: number;
}

export interface IPaginationParams {
  page: number[];
  limit: number;
  sortBy?: string;
  orderBy?: string;
}
