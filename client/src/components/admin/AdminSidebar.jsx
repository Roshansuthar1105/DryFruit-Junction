import { Link, useLocation } from 'react-router-dom';
import { Users, ShoppingBag, Mail, Settings, Activity, Home,Package } from 'lucide-react';

const navItems = [
  { path: '/admin', icon: Home, label: 'Dashboard' },
  { path: '/admin/activities', icon: Activity, label: 'Activities' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
];

export default function AdminSidebar({ user, onLinkClick }) {
  const { pathname } = useLocation();

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick(); // This will close the sidebar
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md p-4 md:p-6 h-fit sticky top-4 md:top-6 transition-all">
      {/* Profile section */}
      <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
          <Settings className="h-5 w-5 md:h-6 md:w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base">Admin Dashboard</h3>
          <p className="text-xs md:text-sm text-gray-500 truncate max-w-[150px]">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 md:space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleClick} // Add click handler here
            className={`w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg flex items-center space-x-2 md:space-x-3 text-sm md:text-base ${
              pathname === item.path
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-4 w-4 md:h-5 md:w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}