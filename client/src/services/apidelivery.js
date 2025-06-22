import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Delivery API Service
export const deliveryApi = {
  // Delivery Partner Endpoints
  getDeliveryPartner: (partnerId) => api.get(`/delivery-partners/${partnerId}`),
  updateDeliveryPartner: (partnerId, data) => api.put(`/delivery-partners/${partnerId}`, data),

  // Order Endpoints
  getAssignedOrders: (partnerId) => api.get(`/orders?deliveryPartner=${partnerId}`),
  getOrderDetails: (orderId) => api.get(`/orders/${orderId}`),
  acceptOrder: (orderId) => api.patch(`/orders/${orderId}/accept`),
  rejectOrder: (orderId) => api.patch(`/orders/${orderId}/reject`),
  completeDelivery: (orderId) => api.patch(`/orders/${orderId}/complete`),
  updateLocation: (orderId, location) => api.post(`/orders/${orderId}/location`, location),

  // Earnings Endpoints
  getEarningsSummary: (partnerId) => api.get(`/delivery-partners/${partnerId}/earnings`),
  getEarningsHistory: (partnerId, params) => api.get(`/delivery-partners/${partnerId}/transactions`, { params }),

  // Tracking Endpoints
  getLiveTrackingData: (orderId) => api.get(`/orders/${orderId}/tracking`),
};

export default api;