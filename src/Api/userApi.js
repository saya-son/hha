import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://localhost:8080', // URL của backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default userApi;
