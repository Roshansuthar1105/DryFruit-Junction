import StatusBadge from "./StatusBadge";

export default function MobileDataCard({ title, subtitle, status, statusVariants, action }) {
    return (
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center font-semibold text-purple-600">
            {title.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-gray-900">{title}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
          </div>
        </div>
        <div className="mb-2">
          <span className="text-gray-500 text-xs">Status:</span>
          <StatusBadge status={status} variants={statusVariants} />
        </div>
        {action && <div className="mt-3">{action}</div>}
      </div>
    );
  }