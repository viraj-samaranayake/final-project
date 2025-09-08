import { useEffect, useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { ArrowLeft } from 'lucide-react';

const EditProfile = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    profileImage: null,
    currentPassword: '',
    newPassword: '',
  });
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/student/profile')
      .then(res => {
        setForm(prev => ({
          ...prev,
          name: res.data.name || '',
          phone: res.data.phone || '',
        }));
        setExistingImage(res.data.profileImage || '');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const data = new FormData();
    data.append('name', form.name);
    data.append('phone', form.phone);
    if (form.currentPassword && form.newPassword) {
      data.append('currentPassword', form.currentPassword);
      data.append('newPassword', form.newPassword);
    }
    if (form.profileImage) {
      data.append('profileImage', form.profileImage);
    }

    try {
      const res = await API.put('/student/edit-profile', data);
      setMessage(res.data.message);
      setTimeout(() => navigate('/student'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    // <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
    //       {/* back link */}
    //   <div className="absolute top-6 left-6 z-20">
    //     <a
    //       href="/student"
    //       className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
    //     >
    //       <ArrowLeft className="w-5 h-5" />
    //       <span className="font-medium">Back</span>
    //     </a>
    //   </div>
    //   <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

    //   {message && <p className="mb-4 text-green-600">{message}</p>}
    //   {error && <p className="mb-4 text-red-600">{error}</p>}

    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div>
    //       <label className="block font-medium">Name</label>
    //       <input
    //         type="text"
    //         name="name"
    //         className="w-full border rounded p-2"
    //         value={form.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-medium">Phone</label>
    //       <input
    //         type="text"
    //         name="phone"
    //         className="w-full border rounded p-2"
    //         value={form.phone}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-medium">Profile Image</label>
    //       {existingImage && (
    //         <img
    //           src={existingImage}
    //           alt="Profile"
    //           className="w-24 h-24 object-cover rounded-full mb-2"
    //         />
    //       )}
    //       <input
    //         type="file"
    //         name="profileImage"
    //         accept="image/png, image/jpeg"
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-medium">Current Password</label>
    //       <input
    //         type="password"
    //         name="currentPassword"
    //         className="w-full border rounded p-2"
    //         value={form.currentPassword}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-medium">New Password</label>
    //       <input
    //         type="password"
    //         name="newPassword"
    //         className="w-full border rounded p-2"
    //         value={form.newPassword}
    //         onChange={handleChange}
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    //     >
    //       Update Profile
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
  {/* animated background orbs */}
  <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />

  {/* back link */}
  <div className="absolute top-6 left-6 z-20">
    <a
      href="/student"
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">Back</span>
    </a>
  </div>

  {/* main card */}
  <main className="relative z-10 max-w-lg mx-auto mt-10">
    <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Edit Profile</h2>

      {message && (
        <p className="mb-4 text-green-600 bg-green-100/70 rounded-xl px-4 py-2">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 text-red-600 bg-red-100/70 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-semibold text-sm text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold text-sm text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-semibold text-sm text-gray-700 mb-1">
            Profile Image
          </label>
          {existingImage && (
            <img
              src={existingImage}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full mb-3 shadow-md"
            />
          )}
          <input
            type="file"
            name="profileImage"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
          />
        </div>

        {/* Current Password */}
        <div>
          <label className="block font-semibold text-sm text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block font-semibold text-sm text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-800  hover:from-blue-700 hover:to-purple-900 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  </main>
</div>
  );
};

export default EditProfile;
