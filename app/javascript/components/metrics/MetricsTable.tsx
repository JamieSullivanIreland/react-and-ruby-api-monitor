import React, { useState, useEffect } from 'react';

import { METRICS_URL, METRICS_KEYS } from '../../common/constants';
import Table from '../common/table/Table';

import { fetchData } from '../../common/api';

import type { IServerMetric, ITableRow } from '../../common/types';

const MetricsTable = () => {
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const { ID, CREATED_AT, CPU_TEMP, CPU_LOAD, DISK_LOAD } = METRICS_KEYS;

  const getTableCells = (metric: IServerMetric) =>
    Object.entries(metric).map((data: Array<any>) => {
      switch (data[0]) {
        case CPU_TEMP:
        case CPU_LOAD:
        case DISK_LOAD:
          return {
            classes: 'text-center',
            label: data[1],
          };
        default:
          return {
            label: data[1],
          };
      }
    });

  const getTableRows = (metrics: IServerMetric[]) =>
    metrics.reduce((acc: any, metric: IServerMetric) => {
      acc.push({
        id: metric.id,
        cells: getTableCells(metric),
      });
      return acc;
    }, []);

  useEffect(() => {
    fetchData(METRICS_URL, {
      page: 1,
      limit: 50,
    })
      .then((data: IServerMetric[]) => {
        console.log(getTableRows(data));
        setTableRows(getTableRows(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const headers = [
    {
      key: ID,
      label: 'ID',
      classes: 'fw-semibold',
    },
    {
      key: CREATED_AT,
      label: 'Timestamp',
      classes: 'fw-semibold',
    },
    {
      key: CPU_TEMP,
      label: 'CPU Temp',
      classes: 'text-center fw-semibold',
    },
    {
      key: CPU_LOAD,
      label: 'CPU Load',
      classes: 'text-center fw-semibold',
    },
    {
      key: DISK_LOAD,
      label: 'Disk Load',
      classes: 'text-center fw-semibold',
    },
  ];

  return (
    <div className='mt-5'>
      <Table
        headerCells={headers}
        rows={tableRows}
      />
    </div>
  );
};

export default MetricsTable;
