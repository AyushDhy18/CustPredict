
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getDashboardSummary = () =>
  api.get('/dashboard/summary')

export const getCustomerTrends = () =>
  api.get('/analytics/customer-trends')

export const getRevenueAnalytics = () =>
  api.get('/analytics/revenue')

export const getCustomerSegments = () =>
  api.get('/analytics/segments')

export const getCustomers = () =>
  api.get('/customers')

export const getPredictions = () =>
  api.get('/predictions')

export default api
