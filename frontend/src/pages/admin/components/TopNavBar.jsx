import { Bell, GraduationCap, Search, Settings } from 'lucide-react';
import AdminLogoutButton from '../../../components/AdminLogoutButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../api';

const TopNavBar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [setLoading] = useState(true);

  useEffect(() => {
    API.get('admin/counts')
      .then((res) => setPendingCount(res.data.pendingTutorCount || 0))
      .catch(() => setPendingCount(0))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                LearnCey Admin
              </h1>
              <p className="text-xs text-gray-500">Administrator Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users, classes..."
              className="pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-800 to-purple-700 text-white px-3 py-2 rounded-lg">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">A</span>
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>

          <Link
            to={'/admin/pending-tutors'}
            className="bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-3 text-gray-100 font-bold rounded-xl"
          >
            Pending Requests
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
