import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', earnings: 1200 },
  { name: 'Tue', earnings: 1900 },
  { name: 'Wed', earnings: 800 },
  { name: 'Thu', earnings: 1600 },
  { name: 'Fri', earnings: 2400 },
  { name: 'Sat', earnings: 1800 },
  { name: 'Sun', earnings: 2100 },
];

export default function EarningsSummary() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Weekly Earnings</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
            <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-blue-50 rounded">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="font-bold">₹12,900</p>
        </div>
        <div className="p-2 bg-green-50 rounded">
          <p className="text-sm text-gray-500">Last Week</p>
          <p className="font-bold">₹10,400</p>
        </div>
        <div className="p-2 bg-purple-50 rounded">
          <p className="text-sm text-gray-500">Change</p>
          <p className="font-bold text-green-600">+24%</p>
        </div>
      </div>
    </div>
  );
}