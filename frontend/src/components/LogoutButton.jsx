import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // clear auth
    navigate('/login');  // redirect
  };

  return (
    <button
      onClick={handleLogout}
    className="
      flex items-center gap-2
      px-4 py-2
      text-sm font-semibold
      text-white
      bg-gradient-to-r from-blue-600 to-purple-600
      rounded-xl shadow-md
      hover:from-blue-700 hover:to-purple-700
      hover:shadow-lg
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
    "
    aria-label="Logout"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
      Logout
    </button>
  );
}
