export default function StatusBadge({ status, variants = {} }) {
    const colorMap = {
      processing: 'yellow',
      shipped: 'blue',
      delivered: 'green',
      cancelled: 'red',
      ...variants
    };
  
    const colorClasses = {
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[colorMap[status]] || colorClasses.blue}`}>
        {status}
      </span>
    );
  }