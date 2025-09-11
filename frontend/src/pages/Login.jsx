import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import FloatingParticles from '../components/FloatingPartcles';
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
  User,
} from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check for empty fields
    if (!form.email || !form.password) {
      setError('All fields are required.');
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate(`/${res.data.role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Main login card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in fade-in-50 slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login form */}
          <div className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-600" />
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
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
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
            </div>

            {/* Remember me and forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group w-full bg-gradient-to-r from-blue-600 to-purple-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
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

          {/* Social login options */}
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

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up for free
            </a>
          </p>
        </div>

        {/* Quick access cards */}
        <div className="grid grid-cols-2 gap-4 mt-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 hover:scale-105 transition-all duration-300 cursor-pointer">
            <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-800 text-sm">
              For Students
            </h3>
            <p className="text-xs text-gray-600 mt-1">Find tutors & learn</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/80 hover:scale-105 transition-all duration-300 cursor-pointer">
            <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-800 text-sm">For Tutors</h3>
            <p className="text-xs text-gray-600 mt-1">Teach & earn</p>
          </div>
        </div>

        {/* Features highlight */}
        <div className="mt-8 text-center animate-in fade-in-50 duration-1000 delay-500">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
