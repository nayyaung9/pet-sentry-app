import axios from 'axios';
import {mapEnvironment} from './environment';
import {ENDPOINT_SECRET_KEY} from '@env';

const PET_SENTRY_ENDPOINT = mapEnvironment({
  development: '192.168.60.234:8000',
  release: 'release-endpoint',
});

const apiInstance = axios.create({
  timeout: 1000 * 60,
  baseURL: `http://${PET_SENTRY_ENDPOINT}/api/`,
  headers: {
    'secret-key': ENDPOINT_SECRET_KEY,
  },
});

apiInstance.interceptors.request.use(async config => {
  /** Token Here */
  return config;
});

export default apiInstance;