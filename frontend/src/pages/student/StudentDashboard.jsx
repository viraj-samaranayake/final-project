import { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import LogoutButton from '../../components/LogoutButton';
import { GraduationCap } from 'lucide-react';
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

  // return (
  //   <div className="max-w-4xl mx-auto p-6 mt-8">
  //     <h1 className="text-3xl font-semibold mb-4">
  //       Welcome, {profile.name || 'Student'}
  //     </h1>

  //     <div className="flex mb-6">
  //       <input
  //         placeholder="Search courses..."
  //         className="flex-grow border rounded p-2"
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //       />

  //       {profile?.profileImage ? (
  //         <img
  //           src={profile.profileImage}
  //           alt="Profile"
  //           className="w-10 h-10 rounded-full object-cover border"
  //         />
  //       ) : (
  //         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
  //           {profile.name?.charAt(0).toUpperCase()}
  //         </div>
  //       )}

  //       <Link
  //         to="/student/edit-profile"
  //         className="ml-4 text-blue-600 hover:underline"
  //       >
  //         Edit Profile
  //       </Link>
  //       <br />

  //       <Link
  //         to="/student/purchased"
  //         className="ml-4 text-blue-600 hover:underline"
  //       >
  //         Purchased Courses
  //       </Link>
  //       <br />

  //       <LogoutButton />
  //     </div>

  //         <div className="max-w-4xl mx-auto p-6 mt-8">
  //     <h2 className="text-2xl font-semibold mb-4">Your Upcoming Classes</h2>
  //     {classes.length === 0 ? (
  //       <p>No upcoming classes scheduled.</p>
  //     ) : (
  //       <ul className="space-y-4">
  //         {classes.map(cls => (
  //           <li key={cls._id} className="border rounded p-4">
  //             <h3 className="text-lg font-medium">{cls.title}</h3>
  //             <p>
  //               Scheduled at: {new Date(cls.scheduledAt).toLocaleString()}
  //             </p>
  //             <Link
  //               target={'blank'}
  //               to={`/student/class-room/${cls._id}`}
  //               className="text-blue-600 hover:underline"
  //             >
  //               Join Class
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>

  //     <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       {filtered.map((course) => (
  //         <div key={course._id} className="border rounded p-4 shadow">
  //           <h3 className="text-xl font-medium">{course.title}</h3>
  //           <p>{course.description}</p>
  //           <p className="mt-2 text-sm text-gray-500">
  //             Tutor: {course.tutor?.name || 'N/A'}
  //           </p>

  //           <div className="mt-2">
  //             <div className="flex space-x-1 text-xl text-yellow-400">
  //               {[1, 2, 3, 4, 5].map((star) => (
  //                 <span key={star}>
  //                   <span
  //                     className={`${
  //                       (course.avgRating || 0) >= star
  //                         ? 'text-yellow-400'
  //                         : 'text-gray-300'
  //                     }`}
  //                   >
  //                     ★
  //                   </span>
  //                 </span>
  //               ))}
  //             </div>
  //             <p className="text-sm text-gray-500 mt-1">
  //               {course.avgRating
  //                 ? `${course.avgRating.toFixed(1)} / 5`
  //                 : 'No ratings yet'}
  //             </p>
  //           </div>

  //           <Link to={`/student/courses/${course._id}`} className='font-semibold hover:text-purple-950'>View</Link>
  //         </div>
  //       ))}
  //     </div>
  //   </div>

  // );
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
    {/* ---------- decorative orbs ---------- */}
    <div className="absolute top-20  left-10  w-72 h-72 bg-gradient-to-r from-blue-400  to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

    {/* ---------- top bar ---------- */}
    <div className="relative z-10 max-w-5xl mx-auto pt-6 flex items-center justify-between">
      {/* brand */}
      <a href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold">LearnCey</span>
      </a>

      {/* right cluster */}
      <div className="flex items-center gap-4">
        {profile?.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-white/50 shadow"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-gray-700 font-bold text-sm shadow">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
        )}

        <Link
          to="/student/edit-profile"
          className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          Profile
        </Link>

        <Link
          to="/student/purchased"
          className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          Courses
        </Link>

        <LogoutButton />
      </div>
    </div>

    {/* ---------- content ---------- */}
    <main className="relative z-10 max-w-5xl mx-auto mt-10">
      {/* welcome + search */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Welcome, {profile.name || 'Student'}
        </h1>

        <div className="flex items-center gap-3">
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* upcoming classes */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Upcoming Classes</h2>
        {classes.length === 0 ? (
          <p className="text-gray-600">No upcoming classes scheduled.</p>
        ) : (
          <ul className="space-y-4">
            {classes.map((cls) => (
              <li key={cls._id} className="border border-gray-200 rounded-xl p-4 bg-white/50">
                <h3 className="text-lg font-medium text-gray-900">{cls.title}</h3>
                <p className="text-sm text-gray-600">
                  Scheduled at: {new Date(cls.scheduledAt).toLocaleString()}
                </p>
                <Link
                  target="blank"
                  to={`/student/class-room/${cls._id}`}
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-blue-600 hover:text-purple-700 transition"
                >
                  Join Class
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* available courses */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="border border-gray-200 rounded-xl p-5 bg-white/50 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
              <p className="text-gray-600 mt-1">{course.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Tutor: {course.tutor?.name || 'N/A'}
              </p>

              {/* stars */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex text-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        (course.avgRating || 0) >= star
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {course.avgRating ? `${course.avgRating.toFixed(1)} / 5` : 'No ratings yet'}
                </span>
              </div>

              <Link
                to={`/student/courses/${course._id}`}
                className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);
};

export default StudentDashboard;
