import React, { useState, useEffect } from 'react';

import { METRICS_URL, METRICS_KEYS } from '../../common/constants';
import Table from '../common/table/Table';

import { fetchData } from '../../common/api';

import type {
  IPaginatedMetrics,
  IServerMetric,
  ITableRow,
} from '../../common/types';
import PaginationNav from '../common/pagination/PaginationNav';
import DropdownButton from '../common/button/DropdownButton';

const MetricsTable = () => {
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([1]);
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
      page,
      limit,
    })
      .then((data: IPaginatedMetrics) => {
        console.log(data);
        const { totalItems, totalPages, results } = data;
        setTotalPages(totalPages);
        setTableRows(getTableRows(results));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, limit]);

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

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const t = [1, 2, 3];

  return (
    <div className='mt-5'>
      <Table
        headerCells={headers}
        rows={tableRows}
      />
      <div className='pagination__container mt-5'>
        <DropdownButton
          labels={['10', '25', '50']}
          activeLabel={'Show 10'}
        />
        <PaginationNav
          pages={t}
          totalPages={totalPages}
          activePage={page}
          onClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default MetricsTable;
