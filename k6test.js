import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 2000,
  duration: '30s',
};

export default function () {
  const random = Math.floor(Math.random() * 3);
  const anotherRandom = Math.floor(Math.random() * 100000 + 900000);
  const thirdRandom = anotherRandom / 20;
  if (random === 0) {
    http.get(`http://localhost:8080/products/${anotherRandom}/styles`);
  } else if (random === 1) {
    http.get(`http://localhost:8080/products/${anotherRandom}/related`);
  } else if (random === 2) {
    http.get(`http://localhost:8080/products/${anotherRandom}`);
  } else {
    http.get(`http://localhost:8080/products?count=20,page=${thirdRandom}`);
  }

  sleep(1);
}
