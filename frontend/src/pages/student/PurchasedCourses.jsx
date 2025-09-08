import { useState, useEffect } from 'react';
import API from '../../api';
import CourseCard from '../../components/CourseCard';
import { ArrowLeft } from 'lucide-react';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/student/purchased-courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-2xl font-semibold mb-4">Purchased Courses</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(({ course }) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourses;
