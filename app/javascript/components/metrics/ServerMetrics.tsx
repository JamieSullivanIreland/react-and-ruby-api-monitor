import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { METRICS_URL } from '../../common/constants';
import Table from '../table/Table';

import type { IServerMetric, ITableData, ITableRow } from '../../common/types';

// interface IProps {
//   data: ITableData;
// }

const ServerMetrics = () => {
  const [serverMetrics, setServerMetrics] = useState([]);
  const [tableRows, setTableRows] = useState<ITableRow[]>([]);

  const getTableCells = (metric: IServerMetric) => {
    return Object.entries(metric)
      .filter(([key]) => key !== 'id' && key !== 'updated_at')
      .map((data) => ({
        key: data[0],
        value: data[1],
      }));
  };

  const getTableRows = (metrics: IServerMetric[]) =>
    metrics.reduce((acc: any, metric: IServerMetric) => {
      acc.push({
        id: metric.id,
        cells: getTableCells(metric),
      });
      return acc;
    }, []);

  useEffect(() => {
    axios
      .get(`${METRICS_URL}/index`)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          setServerMetrics(res.data);

          console.log('get rows');
          console.log(getTableRows(res.data));
          setTableRows(getTableRows(res.data));
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const tableHeaders = {
    headerCells: [
      // {
      //   // key: ETA,
      //   label: 'ID',
      // },
      {
        // key: SUPPLIER,
        key: 'Timestamp',
        value: 'Timestamp',
      },
      {
        // key: PRICE,
        key: 'CPU Temp',
        value: 'CPU Temp',
      },
      {
        // key: CATEGORY,
        key: 'CPU Load',
        value: 'CPU Load',
      },
      {
        // key: VEHICLE_TYPE,
        key: 'Disk Load',
        value: 'Disk Load',
      },
    ],
  };

  return (
    <>
      <Table
        headerCells={tableHeaders.headerCells}
        rows={tableRows}
      />
      {/* <section className='jumbotron jumbotron-fluid text-center'>
        <div className='container py-5'>
          <h1 className='display-4'>serverMetrics for every occasion</h1>
          <p className='lead text-muted'>
            We’ve pulled together our most popular serverMetrics, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
        {serverMetrics.map((metric, i) => (
          <div
            key={i}
            className='col-md-6 col-lg-4'
          >
            <div className='card mb-4'>{metric.cpuTemp}</div>
          </div>
        ))}
      </section> */}
    </>
  );
};

export default ServerMetrics;
