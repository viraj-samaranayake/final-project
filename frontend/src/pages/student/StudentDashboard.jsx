import { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import LogoutButton from '../../components/LogoutButton';
// import useAuth from '../../context/useAuth';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [classes, setClasses] = useState(null);
  //const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    API.get('/student/profile').then((res) => {
      if (!res.data.profileCompleted) navigate('/student/verify');
      else setProfile(res.data);
    });

    API.get('/student/courses').then((res) => setCourses(res.data));

    API.get('/student/courses-with-avg').then((res) => setCourses(res.data));
  }, [navigate]);

    useEffect(() => {
    API.get('/student/my-classes').then(res => setClasses(res.data));
  }, []);

  if (!classes) return <Spinner />;

  if (!profile) return <Spinner />;

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-semibold mb-4">
        Welcome, {profile.name || 'Student'}
      </h1>

      <div className="flex mb-6">
        <input
          placeholder="Search courses..."
          className="flex-grow border rounded p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {profile?.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <Link
          to="/student/edit-profile"
          className="ml-4 text-blue-600 hover:underline"
        >
          Edit Profile
        </Link>
        <br />

        <Link
          to="/student/purchased"
          className="ml-4 text-blue-600 hover:underline"
        >
          Purchased Courses
        </Link>
        <br />

        <LogoutButton />
      </div>

          <div className="max-w-4xl mx-auto p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Your Upcoming Classes</h2>
      {classes.length === 0 ? (
        <p>No upcoming classes scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {classes.map(cls => (
            <li key={cls._id} className="border rounded p-4">
              <h3 className="text-lg font-medium">{cls.title}</h3>
              <p>
                Scheduled at: {new Date(cls.scheduledAt).toLocaleString()}
              </p>
              <Link
                target={'blank'}
                to={`/student/class-room/${cls._id}`}
                className="text-blue-600 hover:underline"
              >
                Join Class
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>

      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((course) => (
          <div key={course._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-medium">{course.title}</h3>
            <p>{course.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Tutor: {course.tutor?.name || 'N/A'}
            </p>

            <div className="mt-2">
              <div className="flex space-x-1 text-xl text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    <span
                      className={`${
                        (course.avgRating || 0) >= star
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {course.avgRating
                  ? `${course.avgRating.toFixed(1)} / 5`
                  : 'No ratings yet'}
              </p>
            </div>

            <Link to={`/student/courses/${course._id}`} className='font-semibold hover:text-purple-950'>View</Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default StudentDashboard;
