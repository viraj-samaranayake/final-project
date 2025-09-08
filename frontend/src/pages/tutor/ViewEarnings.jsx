import { useEffect, useState } from 'react';
import API from '../../api';
import Spinner from '../../components/Spinner';
import { ArrowLeft, Banknote, BookOpen, TrendingUp } from 'lucide-react';

const ViewEarnings = () => {
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    API.get('/tutor/earnings').then((res) => setEarnings(res.data));
  }, []);

  if (!earnings) return <Spinner />;

  const totalSum = earnings.reduce((sum, e) => sum + e.totalEarning, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/tutor"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>
      <main className="relative z-10 max-w-4xl mx-auto pt-24 pb-10">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <Banknote className="w-10 h-10 text-purple-600 mr-3" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            My Earnings
          </h1>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl shadow-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-lg font-medium opacity-90">Total Revenue</p>
            <p className="text-3xl font-bold">
              LKR {totalSum.toLocaleString()}
            </p>
          </div>
          <TrendingUp className="w-12 h-12 opacity-80" />
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {earnings.map((e) => (
            <div
              key={e.courseId}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl hover:scale-[1.002] transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{e.title}</p>
                  <p className="text-sm text-gray-500">Course earnings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  LKR {e.totalEarning.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewEarnings;
