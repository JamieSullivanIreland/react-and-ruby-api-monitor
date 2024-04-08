import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { API_METRICS_URL } from '../constants';

const ServerMetrics = () => {
  const [serverMetrics, setServerMetrics] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_METRICS_URL}/index`)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setServerMetrics(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section className='jumbotron jumbotron-fluid text-center'>
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
      </section>
    </>
  );
};

export default ServerMetrics;
