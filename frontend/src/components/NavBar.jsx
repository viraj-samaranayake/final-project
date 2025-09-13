// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react'; // optional: for icons

// export default function NavBar() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleMenu = () => setMobileOpen(!mobileOpen);

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           EduLanka
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-4 font-semibold">
//           <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
//           <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
//           <Link to="/register" className="text-gray-700 hover:text-blue-600">About</Link>
//           <Link to="/register" className="text-gray-700 hover:text-blue-600">Contact</Link>
//         </div>

//         {/* Hamburger */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-gray-700">
//             {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-2">
//           <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
//           <Link to="/register" className="block text-gray-700 hover:text-blue-600">Register</Link>
//         </div>
//       )}
//     </nav>
//   );
// }

import { GraduationCap, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

// Modern navbar component
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 hover:cursor-pointer transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <a href={'/'} className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LearnCey
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Courses', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="hidden md:block text-gray-700 hover:text-blue-600 font-medium hover:scale-105 transition-transform"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-800 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden text-center mt-4 py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
