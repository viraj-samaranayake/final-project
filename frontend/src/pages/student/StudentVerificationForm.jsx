// import { useState } from 'react';
// import API from '../../api';
// import { useNavigate } from 'react-router-dom';
// import FloatingParticles from '../../components/FloatingPartcles';

// const StudentVerificationForm = () => {
//   const [form, setForm] = useState({
//     phone: '',
//     gender: '',
//     country: '',
//     address: '',
//     dob: '',
//     profileImage: null,
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'profileImage') {
//       setForm({ ...form, profileImage: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append('phone', form.phone);
//       data.append('gender', form.gender);
//       data.append('country', form.country);
//       data.append('address', form.address);
//       data.append('dob', form.dob);
//       if (form.profileImage) {
//         data.append('profileImage', form.profileImage);
//       }

//       await API.post('/student/profile', data);
//       navigate('/student');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Submission failed');
//     }
//   };
// return (
//   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center py-12 px-4 relative overflow-hidden">
//     <FloatingParticles />

//     {/* decorative orbs */}
//     <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
//     <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

//     <div className="relative z-10 w-full max-w-md mx-auto">
//       <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Complete Your Profile
//         </h1>

//         {error && (
//           <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {['phone', 'gender', 'country', 'address', 'dob'].map((field) => (
//             <div key={field}>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {field.charAt(0).toUpperCase() + field.slice(1)} *
//               </label>
//               <input
//                 type={field === 'dob' ? 'date' : 'text'}
//                 name={field}
//                 required
//                 value={form[field]}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//               />
//             </div>
//           ))}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Profile Image
//             </label>
//             <input
//               type="file"
//               name="profileImage"
//               accept="image/*"
//               onChange={handleChange}
//               className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-900 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// );
// };

// export default StudentVerificationForm;

import { useState } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

const StudentVerificationForm = () => {
  const [form, setForm] = useState({
    phone: '',
    gender: '',
    country: '',
    address: '',
    dob: '',
    profileImage: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage') {
      const file = files[0];
      if (file && !file.type.startsWith('image/')) {
        setError('Only image files are allowed.');
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        setError('Image must be smaller than 5MB.');
        return;
      }
      setForm({ ...form, profileImage: file });
      setError('');
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        setForm({ ...form, phone: cleaned });
      }
    } else if (name === 'country') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setForm({ ...form, country: lettersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    if (!form.gender) {
      setError('Please select a gender.');
      return;
    }

    try {
      const data = new FormData();
      data.append('phone', form.phone);
      data.append('gender', form.gender);
      data.append('country', form.country);
      data.append('address', form.address);
      data.append('dob', form.dob);
      if (form.profileImage) {
        data.append('profileImage', form.profileImage);
      }

      await API.post('/student/profile', data);
      navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center py-12 px-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Complete Your Profile
          </h1>

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                minlength="10"
                maxlength="10"
                inputmode="numeric"
                required
                onChange={handleChange}
                pattern="\d{10}"
                title="Enter a 10-digit phone number"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={form.gender}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                required
                onChange={handleChange}
                pattern="[A-Za-z\s]+"
                title="Only letters are allowed"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={form.address}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image *
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                required
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB | Image formats only
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-900 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentVerificationForm;
