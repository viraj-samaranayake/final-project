// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">EduLanka</Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="hidden md:block text-gray-700 hover:text-blue-600">Home</Link>
          {!user && <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>}
          {!user && <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>}
          {user && user.role === 'tutor' && <Link to="/tutor" className="text-gray-700 hover:text-blue-600">Dashboard</Link>}
          {user && user.role === 'admin' && <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>}
          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}
