import { useState } from 'react';
import { 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  GraduationCap,
  Key,
  Send
} from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setIsEmailSent(true);
      } else {
        setError(data.message || 'Error sending email');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handleBackToLogin = () => {
    setIsEmailSent(false);
    setEmail('');
    setMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
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
        {/* Main forgot password card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
          
          {!isEmailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  No worries! Enter your email and we'll send you a reset link
                </p>
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
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
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-800 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Back to login link */}
              <div className="mt-8 text-center">
                <a
                  href="/login"
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Back to Sign In</span>
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="text-center">
                <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Check Your Email
                </h1>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-blue-800 font-semibold">{email}</p>
                </div>
                
                {message && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{message}</p>
                  </div>
                )}

                <p className="text-sm text-gray-500 mb-8">
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>

                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBackToLogin}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Try Another Email
                  </button>
                  <a
                    href="/login"
                    className="block w-full text-center py-3 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    Back to Sign In
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Help section */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Reset links expire in 1 hour</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Check spam/junk folders</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Contact support if issues persist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact support */}
        <div className="mt-6 text-center animate-in fade-in-50 duration-1000 delay-500">
          <p className="text-sm text-gray-600">
            Still having trouble?{' '}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;