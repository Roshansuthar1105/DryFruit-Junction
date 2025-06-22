// pages/delivery/DeliveryTrackingPage.jsx
import { useAuth } from '../../context/AuthContext';
import LiveTracking from '../../components/delivery/LiveTracking';
import { useDeliveryOrders } from '../../hooks/useDeliveryOrders';

export default function DeliveryTrackingPage() {
  const { user } = useAuth();
  const { orders, loading, error } = useDeliveryOrders(user._id);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Live Order Tracking</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-4 h-[500px]">
              <LiveTracking orders={orders} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Active Deliveries</h2>
            {orders.filter(o => o.status === 'in-progress').map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}