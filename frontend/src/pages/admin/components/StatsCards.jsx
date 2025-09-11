import { useEffect, useState } from 'react';
import API from '../../../api';
import { BookOpen, Currency, CurrencyIcon, DollarSign, GraduationCap, IndianRupee, Users } from 'lucide-react';
import Spinner from '../../../components/Spinner';

const StatsCards = () => {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('admin/counts')
      .then((res) => setCounts(res.data))
      .catch(() => setCounts({ studentCount: 0, tutorCount: 0, classCount: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const stats = [
    {
      title: 'Total Students',
      value: counts.studentCount.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Active Tutors',
      value: counts.tutorCount.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      title: 'Total Classes',
      value: counts.classCount.toLocaleString(),
      change: '+5.1%',
      changeType: 'increase',
      icon: BookOpen,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Revenue (LKR)',
      value: `${(counts.totalRevenue / 1000000).toFixed(3)}M`,
      // value: counts.totalRevenue,
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-in fade-in-50 slide-in-from-bottom-4 duration-1000`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl text-white`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.changeType === 'increase'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {stat.change}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
