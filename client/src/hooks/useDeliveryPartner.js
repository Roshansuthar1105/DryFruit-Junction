import { useEffect, useState } from 'react';
import { deliveryApi } from '../services/apidelivery';
export function useDeliveryPartner(partnerId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await deliveryApi.getDeliveryPartner(partnerId);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch delivery partner data');
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchData();
    }
  }, [partnerId]);

  const updateDeliveryPartner = async (updateData) => {
    try {
      setLoading(true);
      const response = await deliveryApi.updateDeliveryPartner(partnerId, updateData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update delivery partner');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateDeliveryPartner };
}