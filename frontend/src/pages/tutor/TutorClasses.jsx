import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api';
import { CalendarDays, Video } from 'lucide-react';

const TutorClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    API.get('/tutor/class').then((res) => setClasses(res.data));
  }, []);

  return (
    // <div className="p-6">
    //   <h2 className="text-xl mb-4">Your Scheduled Classes</h2>
    //   {classes.map((c) => (
    //     <div key={c._id} className="mb-3">
    //       <span>
    //         {c.title} - {new Date(c.scheduledAt).toLocaleString()}
    //       </span>{' '}
    //       <Link to={`/tutor/class-room/${c._id}`} className="text-blue-600">
    //         Go to Classroom
    //       </Link>
    //     </div>
    //   ))}
    // </div>

    <div className="p-4">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Scheduled Classes</h2>

  <div className="grid gap-4 mx-12 sm:grid-cols-2 lg:grid-cols-2">
    {classes.map((c) => (
      <div
        key={c._id}
        className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-all"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {c.title}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(c.scheduledAt).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <Link
          to={`/tutor/class-room/${c._id}`}
          className="mt-4 inline-flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-800 text-white text-sm font-semibold rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition"
        >
          <Video className="w-4 h-4 mr-2" />
          Go to Classroom
        </Link>
      </div>
    ))}
  </div>

  {classes.length === 0 && (
    <div className="text-center py-16">
      <CalendarDays className="mx-auto w-16 h-16 text-gray-300 mb-4" />
      <p className="text-gray-500 font-semibold">No classes scheduled yet.</p>
    </div>
  )}
</div>
  );
};

export default TutorClasses;
