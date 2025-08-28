import { useState } from 'react';
import { 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  GraduationCap,
  Key,
  Eye,
  EyeOff,
  Shield,
  Check,
  X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';


const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z\d]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);
  const getColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-orange-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getLabel = () => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    if (strength <= 4) return 'Strong';
    return 'Very Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Password Strength</span>
        <span className={`text-xs font-medium ${
          strength <= 1 ? 'text-red-600' :
          strength <= 2 ? 'text-orange-600' :
          strength <= 3 ? 'text-yellow-600' :
          strength <= 4 ? 'text-blue-600' : 'text-green-600'
        }`}>
          {getLabel()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

const ResetPassword = () => {

  const { token } = useParams();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) setError('');
  };

  const validatePasswords = () => {
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: formData.password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
        setIsSuccess(true);
        // Simulate navigation after 2 seconds
        //setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Error resetting password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* <FloatingParticles /> */}

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
          <span className="font-medium">EduConnect</span>
        </a>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main reset password card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
          
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Reset Password
                </h1>
                <p className="text-gray-600">
                  Choose a strong password to secure your account
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
                {/* New Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter your new password"
                      value={formData.password}
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
                  <PasswordStrengthIndicator password={formData.password} />
                </div>

                {/* Confirm Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-sm border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-gray-400 ${
                        passwordsMatch ? 'border-green-300 focus:ring-green-500/20 focus:border-green-500' :
                        passwordsDontMatch ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' :
                        'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
                      {formData.confirmPassword && (
                        <div className="flex items-center">
                          {passwordsMatch ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : passwordsDontMatch ? (
                            <X className="w-4 h-4 text-red-500" />
                          ) : null}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {passwordsDontMatch && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>Passwords do not match</span>
                    </p>
                  )}
                  {passwordsMatch && (
                    <p className="text-sm text-green-600 flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Passwords match</span>
                    </p>
                  )}
                </div>

                {/* Password requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                  <ul className="space-y-1 text-xs text-blue-700">
                    <li className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>At least 8 characters long</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>Mix of uppercase and lowercase letters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>At least one number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${/[^a-zA-Z\d]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span>At least one special character</span>
                    </li>
                  </ul>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !passwordsMatch || formData.password.length < 8}
                  className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Resetting...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Reset Password</span>
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
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Password Reset Successfully!
                </h1>
                <p className="text-gray-600 mb-6">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
                
                {message && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-700 text-sm">{message}</p>
                  </div>
                )}

                {/* Action button */}
                <a
                  href="/login"
                  className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 space-x-2"
                >
                  <span>Continue to Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Security info */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Security Tips</span>
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Use a unique password for your account</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Consider using a password manager</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Enable two-factor authentication</span>
              </div>
            </div>
          </div>
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

export default ResetPassword;


