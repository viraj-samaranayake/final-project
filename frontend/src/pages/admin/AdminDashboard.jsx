import { useState } from 'react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Activity,
  UserCheck,
  AlertTriangle,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Globe,
  Award,
  ArrowRight,
} from 'lucide-react';

import AdminLogoutButton from '../../components/AdminLogoutButton'
import { Link } from 'react-router-dom';

// Mock data - replace with actual API calls
const mockStats = {
  totalStudents: 6,
  totalTutors: 4,
  activeClasses: 2,
  totalRevenue: 4500,
  monthlyGrowth: 12.5,
  avgRating: 4.8
};

const monthlyData = [
  { month: 'Jan', students: 8500, tutors: 850, revenue: 1200000 },
  { month: 'Feb', students: 9200, tutors: 920, revenue: 1350000 },
  { month: 'Mar', students: 9800, tutors: 980, revenue: 1450000 },
  { month: 'Apr', students: 10500, tutors: 1050, revenue: 1680000 },
  { month: 'May', students: 11200, tutors: 1120, revenue: 1890000 },
  { month: 'Jun', students: 12000, tutors: 1200, revenue: 2100000 },
  { month: 'Jul', students: 12847, tutors: 1256, revenue: 2847650 }
];

const subjectDistribution = [
  { subject: 'Mathematics', count: 3245, color: '#3b82f6' },
  { subject: 'Science', count: 2876, color: '#8b5cf6' },
  { subject: 'English', count: 2341, color: '#06d6a0' },
  { subject: 'ICT', count: 1987, color: '#f59e0b' },
  { subject: 'Commerce', count: 1654, color: '#ef4444' },
  { subject: 'Arts', count: 744, color: '#ec4899' }
];

const recentActivities = [
  { id: 1, type: 'new_student', message: 'New student registration: Kasun Perera', time: '5 mins ago', icon: Users },
  { id: 2, type: 'new_tutor', message: 'Tutor approved: Dr. Amara Silva (Mathematics)', time: '12 mins ago', icon: GraduationCap },
  { id: 3, type: 'class_completed', message: 'Class completed: Advanced Physics with 25 students', time: '1 hour ago', icon: BookOpen },
  { id: 4, type: 'payment', message: 'Payment processed: Rs. 15,000 tutor earnings', time: '2 hours ago', icon: DollarSign },
  { id: 5, type: 'rating', message: 'New 5-star rating for Chemistry class', time: '3 hours ago', icon: Star }
];

// Floating particles background
const FloatingParticles = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-blue-400/5 rounded-full blur-sm animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animationDelay: `${particle.id * 2}s`,
            animationDuration: '20s'
          }}
        />
      ))}
    </div>
  );
};

// Top Navigation Bar
const TopNav = () => {
  const [notifications] = useState(3);

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">LearnCey Admin</h1>
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
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">A</span>
            </div>
            <span className="text-sm font-medium">Admin</span>
          </div>


        <Link to={'/admin/pending-tutors'} className="bg-green-500 px-5 py-3 font-bold rounded-xl">Pending requests</Link>
        <AdminLogoutButton/>
        </div>
      </div>
    </div>
  );
};

// Stats Cards Component
const StatsCards = () => {
  const stats = [
    {
      title: 'Total Students',
      value: mockStats.totalStudents.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Active Tutors',
      value: mockStats.totalTutors.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Live Classes',
      value: mockStats.activeClasses.toString(),
      change: '+5.1%',
      changeType: 'increase',
      icon: BookOpen,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Revenue (LKR)',
      value: `${(mockStats.totalRevenue / 1000000).toFixed(1)}M`,
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stat.changeType === 'increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {stat.change}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

// Charts Section
const ChartsSection = () => {
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
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="tutors" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Distribution */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Popular Subjects</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={subjectDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ subject, percent }) => `${subject} ${(percent * 100).toFixed(0)}%`}
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

// Recent Activities Component
const RecentActivities = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>View All</span>
        </button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors">
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

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { name: 'Add New Tutor', icon: Plus, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Approve Classes', icon: UserCheck, gradient: 'from-green-500 to-emerald-500' },
    { name: 'View Reports', icon: BarChart, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Send Notifications', icon: Bell, gradient: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={action.name}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className={`p-2 bg-gradient-to-br ${action.gradient} rounded-lg text-white`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Recent Users Table
const RecentUsersTable = () => {
  const users = [
    { id: 1, name: 'Kasun Perera', email: 'kasun@email.com', role: 'Student', status: 'Active', joinDate: '2024-08-25' },
    { id: 2, name: 'Dr. Amara Silva', email: 'amara@email.com', role: 'Tutor', status: 'Pending', joinDate: '2024-08-24' },
    { id: 3, name: 'Nimali Fernando', email: 'nimali@email.com', role: 'Student', status: 'Active', joinDate: '2024-08-23' },
    { id: 4, name: 'Prof. Sunil Kumar', email: 'sunil@email.com', role: 'Tutor', status: 'Active', joinDate: '2024-08-22' },
    { id: 5, name: 'Tharushi Wickrama', email: 'tharushi@email.com', role: 'Student', status: 'Active', joinDate: '2024-08-21' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-sm font-medium text-gray-600 pb-3">Name</th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">Role</th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">Status</th>
              <th className="text-left text-sm font-medium text-gray-600 pb-3">Join Date</th>
              <th className="text-right text-sm font-medium text-gray-600 pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Tutor' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-sm text-gray-600">{user.joinDate}</td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <FloatingParticles />
      
      <TopNav />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor and manage your educational platform</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/80 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Schedule Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <ChartsSection />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="mt-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-500">
          <RecentUsersTable />
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-700">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">{mockStats.avgRating}</h4>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">1,247h</h4>
            <p className="text-sm text-gray-600">Classes This Month</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center hover:shadow-lg transition-all duration-300">
            <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">94%</h4>
            <p className="text-sm text-gray-600">Platform Uptime</p>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Analytics</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Total Revenue:</span>
              <span className="text-lg font-bold text-green-600">Rs. {(mockStats.totalRevenue / 1000000).toFixed(1)}M</span>
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
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`Rs. ${(value / 1000000).toFixed(1)}M`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Health & Alerts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-900">
          {/* System Health */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { service: 'Video Streaming', status: 99.8, color: 'bg-green-500' },
                { service: 'Payment Gateway', status: 98.5, color: 'bg-green-500' },
                { service: 'User Authentication', status: 99.9, color: 'bg-green-500' },
                { service: 'Database', status: 97.2, color: 'bg-yellow-500' }
              ].map((service) => (
                <div key={service.service} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{service.service}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${service.color} transition-all duration-500`}
                        style={{ width: `${service.status}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{service.status}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Issues */}
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
                  <p className="text-sm font-medium text-yellow-800">High Server Load</p>
                  <p className="text-xs text-yellow-700 mt-1">Database queries taking longer than usual</p>
                  <span className="text-xs text-yellow-600">2 hours ago</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Scheduled Maintenance</p>
                  <p className="text-xs text-blue-700 mt-1">System update planned for tonight</p>
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
        </div>

        {/* Platform Metrics Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-1000">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">1,847</h4>
            <p className="text-sm text-gray-600">Total Classes</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +23% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl text-white mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">847</h4>
            <p className="text-sm text-gray-600">Certificates Issued</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +45% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">89%</h4>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5% this month
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-1">95%</h4>
            <p className="text-sm text-gray-600">User Satisfaction</p>
            <div className="mt-2 flex items-center justify-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2% this month
            </div>
          </div>
        </div>

        {/* Logout Button */}
        {/* <div className="mt-12 flex justify-center animate-in fade-in-50 duration-1000 delay-1200">
          <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 hover:from-red-500 hover:to-pink-500">
            <span>Logout Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <LogoutButton />
        </div> */}
      </div>
    </div>
  );
}
