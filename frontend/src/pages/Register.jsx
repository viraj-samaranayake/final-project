// import { useState } from 'react';
// import API from '../api';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../context/useAuth';

// export default function Register() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     role: 'student',
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await API.post('/auth/register', form);
//       login(res.data); // store user/token in context + localStorage
//       navigate(`/${res.data.role}`);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         >
//           <option value="student">Student</option>
//           <option value="tutor">Tutor</option>
//         </select>
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Shield,
  User,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';
import PasswordStrength from '../components/PasswordStrength';
import FloatingParticles from '../components/FloatingPartcles';

// Modern register component
export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Please accept the terms and conditions to continue.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await API.post('/auth/register', form);
      login(res.data); // store user/token in context + localStorage
      navigate(`/${res.data.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: 'student',
      label: 'Student',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Learn from expert tutors',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      value: 'tutor',
      label: 'Tutor',
      icon: <GraduationCap className="w-5 h-5" />,
      description: 'Teach and earn money',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* Back to home link */}
      <div className="absolute top-6 left-6 z-10">
        <a
          href="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">LearnCey</span>
        </a>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main register card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Join LearnCey
            </h1>
            <p className="text-gray-600">
              Create your account and start your learning journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in fade-in-50 slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Registration form */}
          <div className="space-y-6">
            {/* Role selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 block">
                I want to join as
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.role === option.value
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-gray-200 hover:border-gray-300 bg-white/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={form.role === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${option.gradient} text-white mb-2`}
                    >
                      {option.icon}
                    </div>
                    <span className="font-medium text-gray-800 text-sm">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500 text-center mt-1">
                      {option.description}
                    </span>
                    {form.role === option.value && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Name field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm text-gray-600 leading-relaxed"
              >
                I agree to the{' '}
                <a
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !acceptTerms}
              className="group w-full bg-gradient-to-r from-blue-600 to-purple-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500 bg-white/50 rounded-full">
              or
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social registration options */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white/80 hover:shadow-md transition-all duration-200">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-3 gap-3 mt-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 hover:scale-105 transition-all duration-300 text-center">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 text-xs">Secure</h3>
            <p className="text-xs text-gray-600 mt-1">Protected data</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 hover:scale-105 transition-all duration-300 text-center">
            <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 text-xs">Fast Setup</h3>
            <p className="text-xs text-gray-600 mt-1">Quick start</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 hover:scale-105 transition-all duration-300 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 text-xs">Community</h3>
            <p className="text-xs text-gray-600 mt-1">Join 10K+ users</p>
          </div>
        </div>

        {/* Features highlight */}
        <div className="mt-8 text-center animate-in fade-in-50 duration-1000 delay-500">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
