import { Activity, AlertTriangle } from 'lucide-react';

const AlertsAndIssues = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Alerts & Issues</h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          2 Active
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              High Server Load
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Database queries taking longer than usual
            </p>
            <span className="text-xs text-yellow-600">2 hours ago</span>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">
              Scheduled Maintenance
            </p>
            <p className="text-xs text-blue-700 mt-1">
              System update planned for tonight
            </p>
            <span className="text-xs text-blue-600">Tomorrow 2:00 AM</span>
          </div>
        </div>

        <div className="text-center py-4">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsAndIssues;
