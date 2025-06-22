import { useState } from 'react';
import { deliveryApi } from '../services/apidelivery';

export function useDeliveryApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (apiCall, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(...args);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDeliveryPartner: (partnerId) => makeRequest(deliveryApi.getDeliveryPartner, partnerId),
    updateDeliveryPartner: (partnerId, data) => makeRequest(deliveryApi.updateDeliveryPartner, partnerId, data),
    getAssignedOrders: (partnerId) => makeRequest(deliveryApi.getAssignedOrders, partnerId),
    getOrderDetails: (orderId) => makeRequest(deliveryApi.getOrderDetails, orderId),
    acceptOrder: (orderId) => makeRequest(deliveryApi.acceptOrder, orderId),
    rejectOrder: (orderId) => makeRequest(deliveryApi.rejectOrder, orderId),
    completeDelivery: (orderId) => makeRequest(deliveryApi.completeDelivery, orderId),
    updateLocation: (orderId, location) => makeRequest(deliveryApi.updateLocation, orderId, location),
    getEarningsSummary: (partnerId) => makeRequest(deliveryApi.getEarningsSummary, partnerId),
    getEarningsHistory: (partnerId, params) => makeRequest(deliveryApi.getEarningsHistory, partnerId, params),
    getLiveTrackingData: (orderId) => makeRequest(deliveryApi.getLiveTrackingData, orderId),
  };
}