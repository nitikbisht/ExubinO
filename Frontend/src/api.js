import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; //  redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
