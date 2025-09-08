import { useState, useEffect } from 'react';
import API from '../../api';
import Spinner from '../../components/Spinner';
import { ArrowLeft, BookOpen, Star, Users } from 'lucide-react';

const EngagedStudents = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/tutor/engaged-students').then((res) => setData(res.data));
  }, []);

  if (!data) return <Spinner />;

  const totalEngaged = data.reduce((sum, item) => sum + item.engagedCount, 0);

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
      <main className="relative z-10 max-w-5xl mx-auto pt-24 pb-10">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <Users className="w-10 h-10 text-purple-600 mr-3" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Engaged Students
          </h1>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-lg font-medium opacity-90">Total Students</p>
            <p className="text-3xl font-bold">{totalEngaged}</p>
          </div>
          <Users className="w-12 h-12 opacity-80" />
        </div>

        {/* Courses List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((d) => (
            <div
              key={d.courseId}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-5 flex flex-col"
            >
              {/* Course Title */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 truncate">{d.title}</h3>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1.5 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{d.engagedCount} students</span>
                </div>

                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">
                    {d.avgRating ? d.avgRating.toFixed(1) : '—'}
                  </span>
                </div>
              </div>

              {/* Star bar */}
              <div className="mt-2 flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      (d.avgRating || 0) >= star
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EngagedStudents;
