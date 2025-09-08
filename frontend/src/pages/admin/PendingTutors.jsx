import { useEffect, useState } from 'react';
import API from '../../api';
import useAuth from '../../context/useAuth';
import FloatingParticles from '../../components/FloatingPartcles';
import { ArrowLeft } from 'lucide-react';

const PendingTutors = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchPendingTutors = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/pending-tutors');
      setTutors(res.data);
    } catch (err) {
      setError('Failed to fetch tutors.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (tutorId, action) => {
    try {
      setActionLoading(true);
      await API.post(`/admin/review/${tutorId}`, { action });
      setMessage(`Tutor ${action}ed successfully`);
      setTutors(prev => prev.filter(t => t._id !== tutorId));
    } catch (err) {
      setError(`Failed to ${action} tutor`);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTutors();
  }, []);

  // if (loading) return <p>Loading pending tutors...</p>;

  // return (
  //   <div style={{ padding: '2rem' }}>
  //     <h2>Pending Tutor Verifications</h2>
  //     <Link to={'/admin'}> Dashboard</Link>

  //     {message && <p style={{ color: 'green' }}>{message}</p>}
  //     {error && <p style={{ color: 'red' }}>{error}</p>}

  //     {tutors.length === 0 ? (
  //       <p>No pending tutors.</p>
  //     ) : (
  //       tutors.map((tutor) => (
  //         <div key={tutor._id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
  //           <h3>{tutor.name} ({tutor.email})</h3>
  //           <p><strong>NIC:</strong> {tutor.nic}</p>
  //           <p><strong>Phone:</strong> {tutor.phone}</p>
  //           <p><strong>DOB:</strong> {tutor.dob}</p>
  //           <p><strong>Gender:</strong> {tutor.gender}</p>
  //           <p><strong>Country:</strong> {tutor.country}</p>
  //           <p><strong>Address:</strong> {tutor.address}</p>
  //           <p><strong>University:</strong> {tutor.university}</p>
  //           <p><strong>Highest Qualification:</strong> {tutor.highestQualification}</p>
  //           <p><strong>Experience:</strong> {tutor.experienceYears} years</p>
  //           <p><strong>Subjects:</strong> {tutor.subjects?.join(', ')}</p>
  //           <p><strong>Languages:</strong> {tutor.languages?.join(', ')}</p>

  //           {tutor.profileImage && (
  //             <div>
  //               <strong>Profile Image:</strong><br />
  //               <img src={tutor.profileImage} alt="Profile" width="100" />
  //             </div>
  //           )}

  //           {tutor.qualificationFiles?.length > 0 && (
  //             <div>
  //               <strong>Qualification Files:</strong>
  //               <ul>
  //                 {tutor.qualificationFiles.map((fileUrl, idx) => (
  //                   <li key={idx}>
  //                     <a href={fileUrl} target="_blank" rel="noreferrer">File {idx + 1}</a>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           )}

  //           <div style={{ marginTop: '1rem' }}>
  //             <button
  //               disabled={actionLoading}
  //               onClick={() => handleAction(tutor._id, 'approve')}
  //               style={{ marginRight: '1rem', backgroundColor: 'green', color: 'white', padding: '0.5rem' }}
  //             >
  //               Approve
  //             </button>
  //             <button
  //               disabled={actionLoading}
  //               onClick={() => handleAction(tutor._id, 'reject')}
  //               style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem' }}
  //             >
  //               Reject
  //             </button>
  //           </div>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <FloatingParticles />
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
    <FloatingParticles />

    <div className="absolute top-6 left-6 z-20">
      <a
        href="/admin"
        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <ArrowLeft className="w-5 h-5 text-white" />
        </div>
        <span className="font-medium">Admin Dashboard</span>
      </a>
    </div>

    <main className="relative z-10 max-w-5xl mx-auto pt-24 pb-10">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        Pending Tutor Verifications
      </h1>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {tutors.length === 0 ? (
        <p className="text-center text-gray-600">No pending tutors.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800">
                {tutor.name} <span className="text-sm font-normal text-gray-500">({tutor.email})</span>
              </h3>

              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>NIC:</strong> {tutor.nic}</p>
                <p><strong>Phone:</strong> {tutor.phone}</p>
                <p><strong>DOB:</strong> {tutor.dob}</p>
                <p><strong>Gender:</strong> {tutor.gender}</p>
                <p><strong>Country:</strong> {tutor.country}</p>
                <p><strong>Address:</strong> {tutor.address}</p>
                <p><strong>University:</strong> {tutor.university}</p>
                <p><strong>Qualification:</strong> {tutor.highestQualification}</p>
                <p><strong>Experience:</strong> {tutor.experienceYears} years</p>
                <p><strong>Subjects:</strong> {tutor.subjects?.join(', ')}</p>
                <p><strong>Languages:</strong> {tutor.languages?.join(', ')}</p>
              </div>

              {tutor.profileImage && (
                <div>
                  <strong className="text-sm">Profile Image:</strong>
                  <img
                    src={tutor.profileImage}
                    alt="Profile"
                    className="mt-2 rounded-lg w-24 h-24 object-cover"
                  />
                </div>
              )}

              {tutor.qualificationFiles?.length > 0 && (
                <div>
                  <strong className="text-sm">Qualification Files:</strong>
                  <ul className="mt-1 space-y-1">
                    {tutor.qualificationFiles.map((fileUrl, idx) => (
                      <li key={idx}>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          File {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction(tutor._id, 'approve')}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Approve
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction(tutor._id, 'reject')}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
);
};

export default PendingTutors;
