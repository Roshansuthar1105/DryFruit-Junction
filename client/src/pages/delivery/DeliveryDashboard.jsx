import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/delivery/StatsCard';
import RecentDeliveries from '../../components/delivery/RecentDeliveries';
import MapView from '../../components/delivery/MapView';
import EarningsSummary from '../../components/delivery/EarningsSummary';

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data - replace with API calls
  const stats = {
    completed: 24,
    pending: 3,
    earnings: 12500,
    rating: 4.7
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.firstName}</h1>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Completed Deliveries" 
          value={stats.completed} 
          icon="check-circle" 
          color="green" 
        />
        <StatsCard 
          title="Pending Deliveries" 
          value={stats.pending} 
          icon="clock" 
          color="yellow" 
        />
        <StatsCard 
          title="Total Earnings" 
          value={`₹${stats.earnings.toLocaleString()}`} 
          icon="rupee" 
          color="blue" 
        />
        <StatsCard 
          title="Your Rating" 
          value={stats.rating} 
          icon="star" 
          color="purple" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Map View */}
          <div className="bg-white rounded-xl shadow p-4 h-96">
            <h2 className="text-lg font-semibold mb-4">Delivery Locations</h2>
            <MapView />
          </div>
          
          {/* Recent Deliveries */}
          <RecentDeliveries />
        </div>
        
        <div className="space-y-6">
          {/* Earnings Summary */}
          <EarningsSummary />
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-100 text-blue-800 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm">Start Shift</span>
              </button>
              <button className="bg-green-100 text-green-800 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm">Go Online</span>
              </button>
              <button className="bg-yellow-100 text-yellow-800 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm">View Earnings</span>
              </button>
              <button className="bg-purple-100 text-purple-800 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm">Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}