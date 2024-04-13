import React, { useState, useEffect } from 'react';

import { ORDER_BY, METRICS_URL, METRICS_KEYS } from '../../common/constants';
import Table from '../common/table/Table';

import { fetchData } from '../../common/api';

import type {
  IPaginatedMetrics,
  IPaginationParams,
  IServerMetric,
  ITableRow,
} from '../../common/types';
import PaginationNav from '../common/pagination/PaginationNav';
import DropdownButton from '../common/button/DropdownButton';

const MetricsTable = () => {
  const { ID, CREATED_AT, CPU_TEMP, CPU_LOAD, DISK_LOAD } = METRICS_KEYS;
  const { ASC, DESC } = ORDER_BY;
  const dropdownLabels = ['Show 10', 'Show 25', 'Show 50'];
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([1]);
  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    page: 1,
    limit: 10,
    sortBy: ID,
    orderBy: DESC,
  });

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
      page: paginationParams.page,
      limit: paginationParams.limit,
      sort_by: paginationParams.sortBy,
      order_by: paginationParams.orderBy,
    })
      .then((data: IPaginatedMetrics) => {
        console.log(data);
        const { totalPages, results } = data;
        setTotalPages(totalPages);
        setTableRows(getTableRows(results));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    paginationParams.page,
    paginationParams.limit,
    paginationParams.sortBy,
    paginationParams.orderBy,
  ]);

  const headers = [
    {
      key: ID,
      label: 'ID',
      classes: 'fw-semibold',
      isSortable: true,
    },
    {
      key: CREATED_AT,
      label: 'Timestamp',
      classes: 'fw-semibold',
      isSortable: true,
    },
    {
      key: CPU_TEMP,
      label: 'CPU Temp',
      classes: 'text-center fw-semibold',
      isSortable: true,
    },
    {
      key: CPU_LOAD,
      label: 'CPU Load',
      classes: 'text-center fw-semibold',
      isSortable: true,
    },
    {
      key: DISK_LOAD,
      label: 'Disk Load',
      classes: 'text-center fw-semibold',
      isSortable: true,
    },
  ];

  const handlePageClick = (page: number) => {
    setPaginationParams({
      ...paginationParams,
      page,
    });
  };

  const handleDropdownClick = (label: string) => {
    const limit = label.split(' ')[1];
    setPaginationParams({
      ...paginationParams,
      limit,
    });
  };

  const handleSortByClick = (key: string) => {
    let orderBy = ASC;
    if (key === paginationParams.sortBy) {
      orderBy = paginationParams.orderBy === DESC ? ASC : DESC;
    }
    setPaginationParams({
      ...paginationParams,
      sortBy: key,
      orderBy: orderBy,
    });
  };

  return (
    <div className='mt-5'>
      <Table
        paginationParams={paginationParams}
        headerCells={headers}
        rows={tableRows}
        onSort={handleSortByClick}
      />
      <div className='pagination__container mt-5'>
        <DropdownButton
          labels={dropdownLabels}
          activeLabel={`Show ${paginationParams.limit}`}
          onClick={handleDropdownClick}
        />
        <PaginationNav
          totalPages={totalPages}
          activePage={paginationParams.page}
          onClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default MetricsTable;
