import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, 
    { duration: '1m', target: 100 }, 
  ],
};

export default function () {
  let res1 = http.get('http://localhost:3000/user'); 
  check(res1, { 'status was 200': (r) => r.status === 200 });

  let res2 = http.get('http://localhost:3000/deck');
  check(res2, { 'status was 200': (r) => r.status === 200 });

  let res3 = http.post('http://localhost:3000/auth/login', JSON.stringify({
    username: 'testUser',
    password: 'testPass',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(res3, { 'status was 200': (r) => r.status === 200 });

  sleep(1); 
}
