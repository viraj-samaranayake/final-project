import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api';
import LogoutButton from '../../components/LogoutButton';
import FloatingParticles from '../../components/FloatingPartcles';
import {
  GraduationCap,
  PlusCircle,
  Calendar,
  User,
  DollarSign,
  Users,
  Star,
  ViewIcon,
  View,
  Hourglass,
  HourglassIcon,
} from 'lucide-react';
import ChatBotAssistant from '../../components/ChatBotAssistant';

const TutorDashboard = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStatus = async () => {
    try {
      const res = await API.get('/tutor/status');
      setStatus(res.data.verificationStatus);
      if (res.data.verificationStatus === 'none') {
        navigate('/tutor/verify');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------- loading ------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <FloatingParticles />
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const StatusCard = ({ emoji, title, message }) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-blue-700 to-purple-800 rounded-2xl mb-4">
            <span className="text-3xl">{emoji}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-lg font-semibold text-green-700 mb-6">{message}</p>
          <LogoutButton />
        </div>
      </div>
    </div>
  );

  /* ------------- pending ------------- */
  if (status === 'pending')
    return (
      <StatusCard
        emoji='⏳'
        title="Verification Pending"
        message="Your verification is under review. Please wait for admin approval."
      />
    );

  /* ------------- rejected ------------- */
  if (status === 'rejected')
    return (
      <StatusCard
        emoji="❌"
        title="Verification Unsuccessful"
        message="Your verification has been rejected."
      />
    );

  /* ------------- dashboard ------------- */
  const cards = [
    {
      label: 'Add Course',
      path: '/tutor/add-course',
      icon: <PlusCircle className="w-8 h-8 text-blue-600" />,
    },
    {
      label: 'My Courses',
      path: '/tutor/my-courses',
      icon: <ViewIcon className="w-8 h-8 text-blue-600" />,
    },
    {
      label: 'Schedule Class',
      path: '/tutor/schedule-class',
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
    },
    {
      label: 'Edit Profile',
      path: '/tutor/edit-profile',
      icon: <User className="w-8 h-8 text-indigo-600" />,
    },
    {
      label: 'View Earnings',
      path: '/tutor/earnings',
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
    },
    {
      label: 'Engaged Students',
      path: '/tutor/engaged-students',
      icon: <Users className="w-8 h-8 text-pink-600" />,
    },
    {
      label: 'My Classes',
      path: '/tutor/my-classes',
      icon: <ViewIcon className="w-8 h-8 text-yellow-500" />,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      <FloatingParticles />
      <ChatBotAssistant role="tutor" />
      {/* orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">LearnCey</span>
        </a>
        <div className="absolute top-12 right-6 z-20">
          <LogoutButton />
        </div>
      </div>

      {/* main content */}
      <main className="relative z-10 max-w-5xl mx-auto pt-24 pb-10">
        {/* header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Tutor Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your courses, classes & earnings in one place.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={path}
              className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className="mb-4 transition-transform group-hover:scale-110 duration-300">
                {icon}
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;
