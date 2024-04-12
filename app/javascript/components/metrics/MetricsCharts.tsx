import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LineChart from '../common/LineChart';
import ButtonGroup from '../common/ButtonGroup';
import Button from '../common/Button';
import {
  AVG_PER_DAY_URL,
  AVG_PER_HOUR_URL,
  METRICS_FILTERS,
} from '../../common/constants';
import { IAverageMetric } from '../../common/types';

const MetricsCharts = () => {
  const [filter, setFilter] = useState(METRICS_FILTERS.ONE_HOUR);
  const [averageMetric, setAverageMetric] = useState({
    labels: [],
    cpuTemps: [],
    cpuLoads: [],
    diskLoads: [],
  });

  useEffect(() => {
    const token = document.querySelector(
      'meta[name="csrf-token"]'
    ) as HTMLMetaElement;

    if (token) {
      const splitValue = filter.split(' ');
      const num = splitValue[0];
      const timeUnit = splitValue[1];

      console.log('num', num);
      console.log('timeUnit', timeUnit);
      const URL = timeUnit === 'H' ? AVG_PER_HOUR_URL : AVG_PER_DAY_URL;
      axios
        .get(URL, {
          headers: {
            'X-CSRF-Token': token.content,
            'Content-Type': 'application/json',
          },
          params: {
            num,
          },
        })
        .then((res) => {
          if (res.data) {
            const labels: string[] = [];
            const cpuTemps: number[] = [];
            const cpuLoads: number[] = [];
            const diskLoads: number[] = [];
            res.data.forEach((metric: IAverageMetric) => {
              labels.push(metric.label);
              cpuTemps.push(metric.cpu_temp_avg);
              cpuLoads.push(metric.cpu_load_avg);
              diskLoads.push(metric.disk_load_avg);
            });
            setAverageMetric({
              labels,
              cpuTemps,
              cpuLoads,
              diskLoads,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filter]);

  const handleOnClick = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setFilter(target.innerHTML);
    }
  };

  const handleAddNewClick = (e: Event) => {
    console.log('Add NEw');
  };

  return (
    <div>
      <div className='metrics__buttons'>
        <ButtonGroup
          label='Metrics filters'
          btnLabels={Object.values(METRICS_FILTERS).map(
            (value: string) => value
          )}
          onClick={handleOnClick}
        />
        <Button
          label='Add New'
          onClick={handleAddNewClick}
        />
      </div>
      <div className='metrics__container mt-5'>
        <div>
          <LineChart
            labels={averageMetric.labels}
            data={averageMetric.cpuTemps}
          />
        </div>
        <div>
          <LineChart
            labels={averageMetric.labels}
            data={averageMetric.cpuLoads}
          />
        </div>
        <div>
          <LineChart
            labels={averageMetric.labels}
            data={averageMetric.diskLoads}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;
