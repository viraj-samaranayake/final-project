import { useState, useEffect } from 'react';
import API from '../../api';
import CourseCard from '../../components/CourseCard';
import { ArrowLeft } from 'lucide-react';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/student/purchased-courses').then((res) => setCourses(res.data));
  }, []);

  // return (
  //   <div className="max-w-4xl mx-auto p-6 mt-8">
  //     <h1 className="text-2xl font-semibold mb-4">Purchased Courses</h1>
  //     {/* back link */}
  //     <div className="absolute top-6 left-6 z-20">
  //       <a
  //         href="/student"
  //         className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
  //       >
  //         <ArrowLeft className="w-5 h-5" />
  //         <span className="font-medium">Back to Dashboard</span>
  //       </a>
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       {courses.map(({ course }) => (
  //         <CourseCard key={course._id} course={course} />
  //       ))}
  //     </div>
  //   </div>
  // );

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/student"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-5xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Enrolleded Courses
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(({ course }) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PurchasedCourses;
