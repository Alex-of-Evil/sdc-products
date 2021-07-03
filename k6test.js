import http from 'k6/http';
import { sleep } from 'k6';

const API_SERVICE_URL = 'http://3.138.137.215/products';

export const options = {
  vus: 150,
  duration: '30s',
  thresholds: {
    http_req_duration: ['avg<50'],
  },
  discardResponseBodies: true,

};

export default function () {
  const random = Math.floor(Math.random() * 3);
  const anotherRandom = Math.floor(Math.random() * 100000 + 900000);
  const thirdRandom = anotherRandom / 20;
  let url = '';
  const payload = '';
  if (random === 0) {
    url = `${API_SERVICE_URL}/${anotherRandom}/styles`;
  } else if (random === 1) {
    url = `${API_SERVICE_URL}/${anotherRandom}/related`;
  } else if (random === 2) {
    url = `${API_SERVICE_URL}/${anotherRandom}`;
  } else {
    url = `${API_SERVICE_URL}?count=20,page=${thirdRandom}`;
  }

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.get(url, payload, params);
  sleep(0.1);
}
