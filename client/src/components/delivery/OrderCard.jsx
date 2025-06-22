import { Truck, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function OrderCard({ order, onAccept, onReject, onComplete }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {order.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <MapPin className="h-4 w-4" />
        <span>{order.distance} km away</span>
      </div>

      <div className="mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-10 h-10 rounded-md object-cover" 
              />
              <span>{item.name} × {item.quantity}</span>
            </div>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold">₹{order.total}</span>
        
        {order.status === 'pending' ? (
          <div className="flex gap-2">
            <button 
              onClick={onReject}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm flex items-center gap-1"
            >
              <XCircle className="h-4 w-4" /> Reject
            </button>
            <button 
              onClick={onAccept}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" /> Accept
            </button>
          </div>
        ) : order.status === 'in-progress' ? (
          <button 
            onClick={onComplete}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center gap-1"
          >
            <Truck className="h-4 w-4" /> Mark Delivered
          </button>
        ) : null}
      </div>
    </div>
  );
}