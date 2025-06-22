import { useState, useEffect } from 'react';
import { deliveryApi } from '../services/apidelivery';

export function useDeliveryOrders(partnerId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await deliveryApi.getAssignedOrders(partnerId);
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchOrders();
    }
  }, [partnerId]);

  const acceptOrder = async (orderId) => {
    try {
      await deliveryApi.acceptOrder(orderId);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'accepted' } : order
      ));
    } catch (err) {
      throw err;
    }
  };

  const rejectOrder = async (orderId) => {
    try {
      await deliveryApi.rejectOrder(orderId);
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (err) {
      throw err;
    }
  };

  const completeDelivery = async (orderId) => {
    try {
      await deliveryApi.completeDelivery(orderId);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'completed' } : order
      ));
    } catch (err) {
      throw err;
    }
  };

  return { orders, loading, error, acceptOrder, rejectOrder, completeDelivery };
}