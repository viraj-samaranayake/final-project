import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api';
import { ArrowLeft } from 'lucide-react';

const StudentCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/student/courses/${id}`).then((res) => setCourse(res.data));

    API.get('/student/purchased-courses').then((res) => {
      const purchasedIds = res.data.map((e) => e.course._id);
      if (purchasedIds.includes(id)) {
        setAlreadyPurchased(true);
      }
    });
  }, [id]);

  const handleBuy = async () => {
    const { paymentId, amount } = await API.post(
      `/student/courses/${id}/payment`
    ).then((res) => res.data);

    // Simulate PayHere payment here — popup logic or redirect
    const dummyPayHereReference = `PH_${Date.now()}`;

    await API.post(`/student/courses/complete-payment`, {
      paymentId,
      payHereReference: dummyPayHereReference,
    });
    alert('Enrollment successful!');
    navigate('/student');
  };

  if (!course) return <p>Loading...</p>;
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
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
      <div className="relative z-10 max-w-sm w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col items-center text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
          <p className="text-gray-600">{course.description}</p>
          <p className="text-lg font-semibold text-gray-800">
            Price: LKR {course.price}
          </p>

          <button
            onClick={handleBuy}
            disabled={alreadyPurchased}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
                   hover:from-blue-700 hover:to-purple-700 transition-all
                   disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          >
            {alreadyPurchased ? 'Already Purchased' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetail;
