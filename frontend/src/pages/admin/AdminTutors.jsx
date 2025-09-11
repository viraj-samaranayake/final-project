import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';
import API from '../../api';

const AdminTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tutorsPerPage = 10;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await API.get('/admin/tutors');
        if (res.data.success) {
          setTutors(res.data.data);
        } else {
          setError('Failed to load tutors.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching tutor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Generate dropdown values
  const countries = useMemo(() => {
    const unique = new Set(tutors.map((t) => t.country).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [tutors]);

  const subjects = useMemo(() => {
    const allSubjects = tutors.flatMap((t) => t.subjects || []);
    const unique = new Set(allSubjects);
    return ['All', ...Array.from(unique)];
  }, [tutors]);

  // Filter + Search
  useEffect(() => {
    let result = tutors;

    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.email.toLowerCase().includes(lower)
      );
    }

    if (countryFilter !== 'All') {
      result = result.filter((t) => t.country === countryFilter);
    }

    if (subjectFilter !== 'All') {
      result = result.filter((t) =>
        (t.subjects || []).includes(subjectFilter)
      );
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, countryFilter, subjectFilter, tutors]);

  const paginatedTutors = useMemo(() => {
    const start = (currentPage - 1) * tutorsPerPage;
    return filtered.slice(start, start + tutorsPerPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / tutorsPerPage);

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
            All Tutors
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />

            <div className="flex gap-4">
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
              >
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
              >
                {subjects.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tutor Cards */}
          {loading ? (
            <p className="text-center text-gray-500">Loading tutors...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : paginatedTutors.length === 0 ? (
            <p className="text-center text-gray-500">No tutors found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTutors.map((tutor) => (
                  <div
                    key={tutor._id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 p-5 flex flex-col items-center"
                  >
                    <img
                      src={
                        tutor.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          tutor.name
                        )}`
                      }
                      alt={tutor.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-purple-100 shadow"
                    />
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {tutor.name}
                    </h2>
                    <p className="text-sm text-gray-600">{tutor.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {tutor.country || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 truncate text-center">
                      Subjects: {tutor.subjects?.join(', ') || 'N/A'}
                    </p>
                    <p className="text-sm mt-1">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          tutor.verificationStatus === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : tutor.verificationStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : tutor.verificationStatus === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tutor.verificationStatus || 'none'}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Joined {moment(tutor.createdAt).format('LL')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
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

export default AdminTutors;
