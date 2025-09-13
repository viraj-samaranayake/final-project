import { useState, useEffect } from 'react';
import API from '../../api';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ImageIcon,
  Languages,
  Lock,
  Save,
  User,
} from 'lucide-react';

const EditTutorProfile = () => {
  const [form, setForm] = useState({
    phone: '',
    languages: '',
    currentPassword: '',
    newPassword: '',
    profileImage: null,
  });
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/tutor/profile')
      .then((res) => {
        setForm((prev) => ({
          ...prev,
          phone: res.data.phone || '',
          languages: res.data.languages?.join(', ') || '',
        }));
        setExistingImage(res.data.profileImage);
      })
      .finally(() => setLoading(false));
  }, []);

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setForm((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const data = new FormData();
    data.append('phone', form.phone);
    data.append('languages', form.languages);
    if (form.currentPassword && form.newPassword) {
      data.append('currentPassword', form.currentPassword);
      data.append('newPassword', form.newPassword);
    }
    if (form.profileImage) {
      data.append('profileImage', form.profileImage);
    }

    try {
      const res = await API.put('/tutor/edit-profile', data);
      setMessage(res.data.message);
      setTimeout(() => navigate('/tutor'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/tutor"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-md mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center">
            Update Profile
          </h2>

          {message && (
            <p className="mb-3 text-center text-green-600 bg-green-50/60 border border-green-200 rounded-lg py-2 text-sm">
              {message}
            </p>
          )}
          {error && (
            <p className="mb-3 text-center text-red-600 bg-red-50/60 border border-red-200 rounded-lg py-2 text-sm">
              {error}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 mr-1.5 text-gray-500" />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                pattern="\d{10}"
                minlength="10"
                maxlength="10"
                inputmode="numeric"
                title="Enter a 10-digit phone number"
                value={form.phone}
                onChange={onChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+94 7XX XXX XXX"
              />
            </div>

            {/* Languages */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Languages className="w-4 h-4 mr-1.5 text-gray-500" />
                Languages
              </label>
              <input
                type="text"
                name="languages"
                value={form.languages}
                onChange={onChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="English, Sinhala, Tamil"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <ImageIcon className="w-4 h-4 mr-1.5 text-gray-500" />
                Profile Image
              </label>
              {existingImage && (
                <div className="flex justify-center mb-3">
                  <img
                    src={existingImage}
                    alt="Current"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
              )}
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={onChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            {/* Current Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Lock className="w-4 h-4 mr-1.5 text-gray-500" />
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={onChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Lock className="w-4 h-4 mr-1.5 text-gray-500" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={onChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Leave blank to keep unchanged"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Update Profile
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditTutorProfile;
