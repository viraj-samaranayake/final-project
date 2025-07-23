// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <NavBar />

      <main className="max-w-7xl min-h-screen mx-auto px-4 py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-blue-700 mb-4"
        >
          Empowering Sri Lankan Students
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Connect with expert tutors. Learn at your pace. Access live and recorded classes from anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="space-x-4"
        >
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
          >
            Login
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid md:grid-cols-2 gap-8 text-left"
        >
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-2">👨‍🎓 For Students</h3>
            <p>Browse tutors, book classes, attend live sessions, or watch recordings.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-2">👩‍🏫 For Tutors</h3>
            <p>Create a profile, schedule classes, upload materials, and manage earnings.</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
