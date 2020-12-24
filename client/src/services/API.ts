import axios from 'axios';

const BASE_URL = 'http://localhost:8080/'

const API = axios.create({
  timeout: 1000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        localStorage.removeItem('user')
        document.location.href = 'http://localhost:8080/login'
        return
      }
    }
    throw error
  },
);

export default API
