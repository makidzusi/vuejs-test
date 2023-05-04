import axios from 'axios';
import mockPayments from '@/mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
let getPayments = (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
});

if (process.env.NODE_ENV !== 'production') {
  getPayments = mockPayments;
}

export default {
  instance,
  getPayments,
};
