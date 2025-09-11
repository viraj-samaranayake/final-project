import React from 'react';

const SystemHealth = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">
            All Systems Operational
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            service: 'Video Streaming',
            status: 99.8,
            color: 'bg-green-500',
          },
          {
            service: 'Payment Gateway',
            status: 98.5,
            color: 'bg-green-500',
          },
          {
            service: 'User Authentication',
            status: 99.9,
            color: 'bg-green-500',
          },
          { service: 'Database', status: 97.2, color: 'bg-yellow-500' },
        ].map((service) => (
          <div
            key={service.service}
            className="flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700">
              {service.service}
            </span>
            <div className="flex items-center space-x-3">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${service.color} transition-all duration-500`}
                  style={{ width: `${service.status}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {service.status}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemHealth;
