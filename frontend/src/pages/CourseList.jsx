import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get('/public/courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded">
            <h2 className="text-xl">{course.title}</h2>
            <p>{course.description}</p>
            <Link
              to={`/student/courses/${course._id}`}
              className="mt-2 inline-block text-blue-600 underline"
            >
              Buy or Join
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
