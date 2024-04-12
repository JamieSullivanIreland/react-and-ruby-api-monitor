// export interface ITableHeader {
//   key: string;
//   classes?: string;
//   sortable?: boolean;
// }

// export interface ITableColumn {
//   headerKey: string;
//   value: any;
// }

// export interface ITableData {
//   headers: ITableHeader[];
//   columns: ITableColumn[];
// }

export interface ITableCell {
  key: string;
  value: any;
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
