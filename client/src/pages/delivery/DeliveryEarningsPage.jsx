// pages/delivery/DeliveryEarningsPage.jsx
import { useAuth } from '../../context/AuthContext';
import { useDeliveryPartner } from '../../hooks/useDeliveryPartner';

export default function DeliveryEarningsPage() {
  const { user } = useAuth();
  const { data: partner, loading, error } = useDeliveryPartner(user._id);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Earnings</h1>
      {loading ? (
        <p>Loading earnings data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Earnings:</span>
                <span className="font-bold">₹{partner.earnings?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Deliveries:</span>
                <span className="font-bold">{partner.completedDeliveries}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Rating:</span>
                <span className="font-bold">{partner.rating?.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            {/* Add transaction history here */}
          </div>
        </div>
      )}
    </div>
  );
}