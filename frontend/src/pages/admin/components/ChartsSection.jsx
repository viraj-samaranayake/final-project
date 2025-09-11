import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChartsSection = () => {
  const monthlyData = [
    { month: 'May', students: 11200, tutors: 1120, revenue: 1890000 },
    { month: 'Jun', students: 12000, tutors: 1200, revenue: 2100000 },
    { month: 'Jul', students: 12847, tutors: 1256, revenue: 2847650 },
  ];

  const subjectDistribution = [
    { subject: 'Mathematics', count: 3245, color: '#3b82f6' },
    { subject: 'Science', count: 2876, color: '#8b5cf6' },
    { subject: 'English', count: 2341, color: '#06d6a0' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* User Growth Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">User Growth</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyData}>
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
            />
            <Area
              type="monotone"
              dataKey="students"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="tutors"
              stackId="2"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Distribution */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Popular Courses
          </h3>
          <Link
            to={'/admin/all-courses'}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={subjectDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ subject, percent }) =>
                `${subject} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {subjectDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
