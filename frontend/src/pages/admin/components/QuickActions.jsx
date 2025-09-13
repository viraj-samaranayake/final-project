import {
  BarChart,
  Bell,
  ChartBar,
  GraduationCap,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      name: 'View Tutors',
      link: '/admin/tutors',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'View Students',
      link: '/admin/students',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      name: 'View Status',
      link: '/admin/reports',
      icon: BarChart,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Revenue Report',
      link: '/admin/reports/monthly-revenue',
      icon: ChartBar,
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            to={action.link}
            key={action.name}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div
              className={`p-2 bg-gradient-to-br ${action.gradient} rounded-lg text-white`}
            >
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
