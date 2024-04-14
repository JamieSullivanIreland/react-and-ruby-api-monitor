import React, { useState, useEffect } from 'react';

import LineChart from '../common/chart/LineChart';
import ButtonGroup from '../common/button/ButtonGroup';
import Button from '../common/button/Button';
import {
  AVG_PER_DAY_URL,
  AVG_PER_HOUR_URL,
  METRICS_FILTERS,
} from '../../common/constants';
import { fetchData } from '../../common/api';
import { IAverageMetric } from '../../common/types';

interface IProps {
  onCreateMetricClick: () => void;
}

const MetricsCharts = ({ onCreateMetricClick }: IProps) => {
  const [activeFilter, setActiveFilter] = useState(METRICS_FILTERS.ONE_HOUR);
  const [averageMetric, setAverageMetric] = useState({
    labels: [],
    cpuTemps: [],
    cpuLoads: [],
    diskLoads: [],
  });

  const parseFilterValue = (filter: string) => {
    const filterValue = {
      time: '',
      timeUnit: '',
    };
    for (let i = 0; i < filter.length; i++) {
      if (filter[i] >= '0' && filter[i] <= '9') {
        filterValue.time += filter[i];
        continue;
      }
      filterValue.timeUnit = filter[i];
      break;
    }
    return filterValue;
  };

  useEffect(() => {
    const filterValue = parseFilterValue(activeFilter);
    const { time, timeUnit } = filterValue;
    const url = timeUnit === 'H' ? AVG_PER_HOUR_URL : AVG_PER_DAY_URL;
    fetchData(url, {
      num: time,
    })
      .then((data: IAverageMetric[]) => {
        const labels: string[] = [];
        const cpuTemps: number[] = [];
        const cpuLoads: number[] = [];
        const diskLoads: number[] = [];
        data.forEach((metric: IAverageMetric) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeFilter]);

  const handleOnClick = (e: Event) => {
    const target = e.target as HTMLButtonElement;
    if (target) {
      setActiveFilter(target.innerHTML);
    }
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
          activeBtnLabel={activeFilter}
        />
        <Button
          label='Add New'
          onClick={onCreateMetricClick}
        />
      </div>
      <div className='metrics__container mt-5'>
        <div>
          <LineChart
            header='CPU Temp'
            labels={averageMetric.labels}
            data={averageMetric.cpuTemps}
          />
        </div>
        <div>
          <LineChart
            header='CPU Load'
            labels={averageMetric.labels}
            data={averageMetric.cpuLoads}
          />
        </div>
        <div>
          <LineChart
            header='Disk Load'
            labels={averageMetric.labels}
            data={averageMetric.diskLoads}
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;
