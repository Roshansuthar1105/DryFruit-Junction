import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAdminData } from '../../hooks/useAdminData';
import { useState } from 'react';
export default function RecentDeliveries() {
  const { data: orders, loading, error } = useAdminData('orders');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and transform orders to get only delivered orders
  const deliveries = orders
    ?.filter(order => order.orderStatus === 'delivered')
    ?.map(order => ({
      _id: order._id,
      user: {
        _id: order.user?._id,
        firstName: order.user?.firstName || 'Unknown',
        lastName: order.user?.lastName || 'Customer',
        phone: order.shippingInfo?.phone || ''
      },
      totalPrice: order.totalPrice,
      orderStatus: order.orderStatus,
      orderNumber: order.orderNumber,
      deliveredAt: order.deliveredAt
    })) || [];
  // const deliveries = orders
  //   ?.filter(order => order.orderStatus === 'delivered')
  //   ?.map(order => ({
  //     _id: order._id,
  //     user: {
  //       _id: order.user?._id,
  //       firstName: order.user?.firstName || 'Unknown',
  //       lastName: order.user?.lastName || 'Customer'
  //     },
  //     orderItems: order.orderItems?.map(item => ({
  //       product: item.product,
  //       name: item.name,
  //       quantity: item.quantity,
  //       price: item.price,
  //       images: item.images?.map(img => ({
  //         url: img.url,
  //         alt: img.alt || item.name,
  //         _id: img._id
  //       }))
  //     })),
  //     shippingInfo: {
  //       location: {
  //         address: order.shippingInfo?.location?.address,
  //         latitude: order.shippingInfo?.location?.latitude,
  //         longitude: order.shippingInfo?.location?.longitude
  //       },
  //       name: order.shippingInfo?.name,
  //       email: order.shippingInfo?.email,
  //       phone: order.shippingInfo?.phone,
  //       pincode: order.shippingInfo?.pincode,
  //       address: order.shippingInfo?.address,
  //       city: order.shippingInfo?.city,
  //       notes: order.shippingInfo?.notes || ''
  //     },
  //     paymentInfo: {
  //       method: order.paymentInfo?.method,
  //       status: order.paymentInfo?.status
  //     },
  //     itemsPrice: order.itemsPrice,
  //     shippingPrice: order.shippingPrice,
  //     totalPrice: order.totalPrice,
  //     orderStatus: order.orderStatus,
  //     createdAt: order.createdAt,
  //     orderNumber: order.orderNumber,
  //     deliveredAt: order.deliveredAt
  //   })) || [];

  // Filter deliveries based on search term
  const filteredDeliveries = deliveries.sort((a, b) => new Date(b.deliveredAt) - new Date(a.deliveredAt));;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Deliveries</h2>
      <div className="space-y-3">
        {filteredDeliveries.map(delivery => (
          <div key={delivery._id} className="shadow p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="font-bold">Order #{delivery.orderNumber}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Delivered
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(delivery.deliveredAt).toLocaleString()}
            </p>
            <p className="mt-1">
              Customer: {delivery.user.firstName} {delivery.user.lastName}
            </p>
            <p className="mt-1">
              Phone: {delivery.user.phone}
            </p>
            <p className="font-bold mt-2">₹{delivery.totalPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}