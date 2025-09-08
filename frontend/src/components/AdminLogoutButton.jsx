import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { ArrowRight } from 'lucide-react';

export default function AdminLogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear auth
    navigate('/login'); // redirect
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-5 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 hover:from-red-500 hover:to-pink-500"
      >
        <span>Logout Admin</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
}
