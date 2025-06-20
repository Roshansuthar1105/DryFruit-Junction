import { useAdminData } from '../../hooks/useAdminData';
import DataCard from '../../components/admin/DataCard.jsx';
import { Users, ShoppingBag, Mail, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { data: users, loading: usersLoading } = useAdminData('users');
  const { data: orders, loading: ordersLoading } = useAdminData('orders');
  const { data: contacts, loading: contactsLoading } = useAdminData('contacts');
  const { data: activities, loading: activitiesLoading } = useAdminData('activities');

  const stats = [
    { title: 'Total Users', value: users.length, icon: Users, color: 'purple' },
    { title: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'blue' },
    { title: 'Contact Messages', value: contacts.length, icon: Mail, color: 'green' },
    { title: 'Recent Activities', value: activities.length, icon: Activity, color: 'orange' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4 border-gray-200">
        Admin Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <DataCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            loading={
              stat.title.includes('Users') ? usersLoading :
              stat.title.includes('Orders') ? ordersLoading :
              stat.title.includes('Messages') ? contactsLoading :
              activitiesLoading
            }
          />
        ))}
      </div>
      
      {/* Add more dashboard components here */}
    </div>
  );
}