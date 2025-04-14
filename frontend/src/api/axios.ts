import axios from 'axios';
import { config } from '../config/env';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

export default axiosInstance;
