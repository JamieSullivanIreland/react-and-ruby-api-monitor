import axios from 'axios';

export const fetchData = (url: string, params: any) => {
  const token = document.querySelector(
    'meta[name="csrf-token"]'
  ) as HTMLMetaElement;

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
