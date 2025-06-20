import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useApi = () => {
  const { BACKEND_API } = useAuth();

  const getToken = () => localStorage.getItem('token');

  const getHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return {
    fetchUsers: () => axios.get(`${BACKEND_API}/api/users`, getHeaders()),
    fetchOrders: () => axios.get(`${BACKEND_API}/api/orders`, getHeaders()),
    fetchContacts: () => axios.get(`${BACKEND_API}/api/contact`, getHeaders()),
    fetchActivities: () => axios.get(`${BACKEND_API}/api/activities`, getHeaders()),
    updateUserRole: (userId, newRole) =>
      axios.put(`${BACKEND_API}/api/users/${userId}/role`, { role: newRole }, getHeaders()),
    updateContactStatus: (contactId, newStatus) =>
      axios.put(`${BACKEND_API}/api/contact/${contactId}`, { status: newStatus }, getHeaders()),
    updateOrderStatus: (orderId, newStatus) =>
      axios.put(`${BACKEND_API}/api/orders/${orderId}`, { status: newStatus }, getHeaders()),
  };
};

export default useApi;