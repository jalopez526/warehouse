import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInboundLoads = async (status?: string) => {
  const { data } = await api.get('/inbound-loads', { params: { status } });
  return data;
};

export const fetchOrders = async (status?: string) => {
  const { data } = await api.get('/orders', { params: { status } });
  return data;
};
