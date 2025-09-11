import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import API from '../../api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/admin/courses');
        setCourses(res.data.data);
      } catch (err) {
        setError('Failed to fetch courses.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/admin"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-6xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
            All Courses
          </h1>

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          {loading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-600">No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                >
                  {course.thumbnailImage && (
                    <img
                      src={course.thumbnailImage}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      Tutor: {course.tutor?.name}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      {course.description?.substring(0, 100)}...
                    </p>
                    <p className="text-purple-700 font-medium">
                      LKR {course.price || 'Free'}
                    </p>
                    <div className="flex flex-wrap mt-3 gap-2">
                      <span className="text-xs text-gray-600 py-1">Subjects: </span>
                      {course.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
