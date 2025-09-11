import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';
import API from '../../api';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const studentsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get('/admin/students');
        if (res.data.success) {
          setStudents(res.data.data);
        } else {
          setError('Failed to load student data.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Create a unique list of countries for filter dropdown
  const countries = useMemo(() => {
    const unique = new Set(students.map((s) => s.country).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [students]);

  // Apply search and filters
  useEffect(() => {
    let result = students;

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.email.toLowerCase().includes(lower)
      );
    }

    if (countryFilter !== 'All') {
      result = result.filter((s) => s.country === countryFilter);
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 on search/filter change
  }, [search, countryFilter, students]);

  // Paginate filtered students
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * studentsPerPage;
    return filtered.slice(start, start + studentsPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / studentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* Back Link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/admin"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
            All Students
          </h1>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
            >
              {countries.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Students */}
          {loading ? (
            <p className="text-center text-gray-500">Loading students...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : paginatedStudents.length === 0 ? (
            <p className="text-center text-gray-500">No students found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedStudents.map((student) => (
                  <div
                    key={student._id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col items-center"
                  >
                    <img
                      src={
                        student.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          student.name
                        )}`
                      }
                      alt={student.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-purple-100 shadow"
                    />
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {student.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">
                      <a href={`mailto:${student.email}`}>{student.email}</a>
                    </p>
                    <p className="text-sm text-gray-500">
                      {student.country || 'N/A'} • {student.city || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Joined {moment(student.createdAt).format('LL')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                          page === currentPage
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminStudents;
