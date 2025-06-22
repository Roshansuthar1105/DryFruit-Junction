// StatsCard.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react'; // Using Font Awesome icons

const StatsCard = ({ title, value, icon, color }) => {
  // Color mapping for different styles
  const colorMap = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  // Icon mapping
  const iconMap = {
    'check-circle': <CheckCircle className="text-xl" />,
    // Add more icons as needed
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${colorMap[color] || colorMap.green}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-white bg-opacity-30">
          {iconMap[icon] || iconMap['check-circle']}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;