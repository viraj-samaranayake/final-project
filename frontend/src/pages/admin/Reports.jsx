import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import API from '../../api';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get('/admin/reports');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load report data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/admin"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
            Admin Reports
          </h1>

          {loading ? (
            <p className="text-center text-gray-500">Loading report data...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <ReportCard
                title="Total Tutors"
                value={stats.tutorCount}
                color="from-blue-500 to-blue-700"
              />
              <ReportCard
                title="Pending Tutors"
                value={stats.pendingTutorCount}
                color="from-yellow-500 to-yellow-700"
              />
              <ReportCard
                title="Total Students"
                value={stats.studentCount}
                color="from-green-500 to-green-700"
              />
              <ReportCard
                title="Total Classes"
                value={stats.classCount}
                color="from-indigo-500 to-indigo-700"
              />
              <ReportCard
                title="Total Revenue (LKR)"
                value={`LKR ${stats.totalRevenue.toLocaleString()}`}
                color="from-purple-500 to-purple-700"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const ReportCard = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-r ${color} text-white rounded-xl shadow-md p-6`}
  >
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Reports;
