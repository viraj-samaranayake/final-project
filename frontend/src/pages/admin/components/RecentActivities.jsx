import { BookOpen, DollarSign, Eye, GraduationCap, MoreHorizontal, Star, Users } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    type: 'new_student',
    message: 'New student registration: Kasun Perera',
    time: '5 mins ago',
    icon: Users,
  },
  {
    id: 2,
    type: 'new_tutor',
    message: 'Tutor approved: Dr. Amara Silva (Mathematics)',
    time: '12 mins ago',
    icon: GraduationCap,
  },
  {
    id: 3,
    type: 'class_completed',
    message: 'Class completed: Advanced Physics with 25 students',
    time: '1 hour ago',
    icon: BookOpen,
  },
  {
    id: 4,
    type: 'payment',
    message: 'Payment processed: Rs. 15,000 tutor earnings',
    time: '2 hours ago',
    icon: DollarSign,
  },
  {
    id: 5,
    type: 'rating',
    message: 'New 5-star rating for Chemistry class',
    time: '3 hours ago',
    icon: Star,
  },
];

// Recent Activities Component
const RecentActivities = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Activities
        </h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>View All</span>
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white flex-shrink-0">
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
