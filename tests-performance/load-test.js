import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '3s',
};

export default function () {
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify({ username: 'invitado', password: 'guestPassword123' });
    const params = { headers: { 'Content-Type': 'application/json' } };

    const res = http.post(url, payload, params);

    check(res, {
        'status es 200': (r) => r.status === 200,
        'asigna VLAN de invitado': (r) => r.body.includes('VLAN_GUEST_20'),
    });
    sleep(1);
}