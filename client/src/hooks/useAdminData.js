import { useState, useEffect } from 'react';
import useApi from '../services/apiService';

export function useAdminData(resource) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const api = useApi();

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      switch (resource) {
        case 'users':
          response = await api.fetchUsers();
          break;
        case 'orders':
          response = await api.fetchOrders();
          break;
        case 'contacts':
          response = await api.fetchContacts();
          break;
        case 'activities':
          response = await api.fetchActivities();
          console.log("activity resp: ",response);
          break;
        case 'products':
          response = (await api.getProducts()).data;
          console.log("prod resp: ",response);
          break;
        default:
          throw new Error('Invalid resource');
      }
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to fetch ${resource}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resource]);

  const updateStatus = async (id, newStatus, type) => {
    try {
      switch (type) {
        case 'user':
          await api.updateUserRole(id, newStatus);
          break;
        case 'contact':
          await api.updateContactStatus(id, newStatus);
          break;
        case 'order':
          await api.updateOrderStatus(id, newStatus);
          break;
        default:
          throw new Error('Invalid type');
      }
      fetchData(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  return { data, loading, error, updateStatus, fetchData };
}