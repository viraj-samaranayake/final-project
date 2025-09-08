import { useState, useEffect } from 'react';
import API from '../../api';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Edit3 } from 'lucide-react';

const TutorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      const res = await API.get('/tutor/my-courses');
      setCourses(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    // <div className="max-w-4xl mx-auto p-6 mt-8">
    //   <h1 className="text-3xl font-semibold mb-6">My Courses</h1>
    //         {/* back link */}
    //   <div className="absolute top-6 left-6 z-20">
    //     <a
    //       href="/tutor"
    //       className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
    //     >
    //       <ArrowLeft className="w-5 h-5" />
    //       <span className="font-medium">Back to Dashboard</span>
    //     </a>
    //   </div>
    //   {courses.length === 0 ? (
    //     <p>You haven’t added any courses yet.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
    //       {courses.map(course => (
    //         <div key={course._id} className="border rounded-lg shadow hover:shadow-md transition p-4">
    //           {course.thumbnailImage && (
    //             <img
    //               src={course.thumbnailImage}
    //               alt={course.title}
    //               className="h-40 w-full object-cover rounded"
    //             />
    //           )}
    //           <h2 className="text-xl font-semibold mt-4">{course.title}</h2>
    //           <p className="text-gray-600 mt-2">{course.description}</p>
    //           <p className="font-medium mt-2">Rs: {course.price}</p>
    //           <p className="mt-1 text-sm text-gray-700">
    //             <span className="font-medium">Subjects:</span> {course.subjects.join(', ')}
    //           </p>
    //           <Link
    //             to={`/tutor/edit-course/${course._id}`}
    //             className="inline-block mt-4 text-blue-600 hover:text-purple-800"
    //           >
    //             Edit Course
    //           </Link>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
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
      <div className="flex items-center justify-center mb-10">
        <BookOpen className="w-10 h-10 text-purple-600 mr-3" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          My Courses
        </h1>
      </div>

      {courses.length === 0 ? (
        <div className="text-center">
          <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">You haven't added any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              {course.thumbnailImage ? (
                <img
                  src={course.thumbnailImage}
                  alt={course.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
              )}

              <div className="p-5 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 truncate">{course.title}</h2>
                <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-purple-600">
                    LKR {course.price}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">Subjects:</span> {course.subjects.join(', ')}
                </div>

                <Link
                  to={`/tutor/edit-course/${course._id}`}
                  className="mt-auto flex items-center justify-center w-full py-2 px-4 rounded-xl
                             bg-gradient-to-r from-blue-700 to-purple-900 text-white font-semibold
                             hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Course
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
  );
};

export default TutorCourses;
