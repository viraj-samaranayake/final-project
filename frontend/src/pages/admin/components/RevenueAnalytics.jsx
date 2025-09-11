import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const monthlyData = [
  { month: 'Jan', students: 8500, tutors: 850, revenue: 1200000 },
  { month: 'Feb', students: 9200, tutors: 920, revenue: 1350000 },
  { month: 'Mar', students: 9800, tutors: 980, revenue: 1450000 },
  { month: 'Apr', students: 10500, tutors: 1050, revenue: 1680000 },
  { month: 'May', students: 11200, tutors: 1120, revenue: 1890000 },
  { month: 'Jun', students: 12000, tutors: 1200, revenue: 2100000 },
  { month: 'Jul', students: 12847, tutors: 1256, revenue: 2847650 },
];

const RevenueAnalytics = () => {
  return (
    <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Revenue Analytics
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Total Revenue:</span>
          <span className="text-lg font-bold text-green-600">
            Rs. {(155842 / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => [
              `Rs. ${(value / 1000000).toFixed(1)}M`,
              'Revenue',
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: '#8b5cf6',
              strokeWidth: 2,
              fill: '#fff',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueAnalytics;
