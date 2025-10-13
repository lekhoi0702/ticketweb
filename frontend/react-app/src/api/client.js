import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchEvents() {
  const { data } = await api.get('/events/');
  return data;
}

export async function fetchEvent(id) {
  const { data } = await api.get(`/events/${id}/`);
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post('/register/', payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post('/login/', payload);
  return data;
}

export async function createOrder(payload) {
  const { data } = await api.post('/orders/create/', payload);
  return data;
}

export async function processPayment(orderId, payload) {
  const { data } = await api.post(`/orders/${orderId}/process_payment/`, payload);
  return data;
}


