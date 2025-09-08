import { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FloatingParticles from '../../components/FloatingPartcles';

const TutorVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: '',
    phone: '',
    dob: '',
    gender: '',
    country: '',
    address: '',
    highestQualification: '',
    university: '',
    experienceYears: '',
    subjects: '',
    languages: '',
    profileImage: null,
    qualificationFiles: [],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else if (name === 'qualificationFiles') {
      setFormData({ ...formData, qualificationFiles: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'qualificationFiles') {
        for (let i = 0; i < value.length; i++) {
          data.append('qualificationFiles', value[i]);
        }
      } else if (key === 'profileImage' && value) {
        data.append('profileImage', value);
      } else if (['subjects', 'languages'].includes(key)) {
        data.append(key, JSON.stringify(value.split(',').map((v) => v.trim())));
      } else {
        data.append(key, value);
      }
    });

    try {
      await API.post('/tutor/submit', data);
      navigate('/tutor');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-md rounded-md">
  //     <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
  //       Tutor Verification Form
  //     </h2>

  //     {error && (
  //       <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
  //     )}

  //     <form
  //       onSubmit={handleSubmit}
  //       encType="multipart/form-data"
  //       className="space-y-5"
  //     >
  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //         <input
  //           type="text"
  //           name="nic"
  //           placeholder="NIC"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="phone"
  //           placeholder="Phone"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="date"
  //           name="dob"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="gender"
  //           placeholder="Gender"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="country"
  //           placeholder="Country"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="address"
  //           placeholder="Address"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="highestQualification"
  //           placeholder="Highest Qualification"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="university"
  //           placeholder="University"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="number"
  //           name="experienceYears"
  //           placeholder="Experience (years)"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="subjects"
  //           placeholder="Subjects (comma separated)"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //         <input
  //           type="text"
  //           name="languages"
  //           placeholder="Languages (comma separated)"
  //           onChange={handleChange}
  //           required
  //           className="input-field"
  //         />
  //       </div>

  //       <div>
  //         <label className="block mb-1 text-sm font-medium text-gray-700">
  //           Profile Image (optional):
  //         </label>
  //         <input
  //           type="file"
  //           name="profileImage"
  //           accept="image/*"
  //           onChange={handleChange}
  //           className="file-input"
  //         />
  //       </div>

  //       <div>
  //         <label className="block mb-1 text-sm font-medium text-gray-700">
  //           Qualification Files (1–5):
  //         </label>
  //         <input
  //           type="file"
  //           name="qualificationFiles"
  //           multiple
  //           accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
  //           onChange={handleChange}
  //           required
  //           className="file-input"
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         disabled={loading}
  //         className={`w-full py-2 px-4 rounded-md text-white font-semibold transition ${
  //           loading
  //             ? 'bg-gray-400 cursor-not-allowed'
  //             : 'bg-blue-600 hover:bg-blue-700'
  //         }`}
  //       >
  //         {loading ? 'Submitting...' : 'Submit Verification'}
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-start py-12 px-4 relative overflow-hidden">
      <FloatingParticles />

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

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Tutor Verification
          </h2>

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {/* <input
              type="text"
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            /> */}
              <select
                name="gender"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="" disabled selected>
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="highestQualification"
                placeholder="Highest Qualification"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="university"
                placeholder="University"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="number"
                name="experienceYears"
                placeholder="Experience (years)"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="subjects"
                placeholder="Subjects (comma separated)"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <input
                type="text"
                name="languages"
                placeholder="Languages (comma separated)"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Profile Image (optional):
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Qualification Files (1–5):
              </label>
              <input
                type="file"
                name="qualificationFiles"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                onChange={handleChange}
                required
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-800 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Verification'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TutorVerification;
