import axios from 'axios';

import type { IServerMetric } from '../common/types';

const getToken = () => {
  return document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
};

export const fetchData = (url: string, params: any) => {
  const token = getToken();
  if (token) {
    return axios
      .get(url, {
        headers: {
          'X-CSRF-Token': token.content,
          'Content-Type': 'application/json',
        },
        params,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }

  return Promise.resolve();
};

export const submitNewMetric = (data: IServerMetric) => {
  const token = getToken();
  if (token) {
    return axios
      .post('/api/v1/server_metrics/create', data, {
        headers: {
          'X-CSRF-Token': token.content,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  return Promise.resolve();
};
