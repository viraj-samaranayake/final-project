import { useState, useEffect } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';

const AddCourse = () => {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    subjects: [],
    thumbnailImage: null,
    studyDocs: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/tutor/subjects').then((res) => setSubjects(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnailImage') {
      setForm({ ...form, thumbnailImage: files[0] });
    } else if (name === 'studyDocs') {
      setForm({ ...form, studyDocs: files });
    } else if (name === 'subjects') {
      const selected = Array.from(e.target.selectedOptions).map(
        (opt) => opt.value
      );
      setForm({ ...form, subjects: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('subjects', JSON.stringify(form.subjects));
    if (form.thumbnailImage) data.append('thumbnailImage', form.thumbnailImage);
    for (let i = 0; i < form.studyDocs.length; i++) {
      data.append('studyDocs', form.studyDocs[i]);
    }

    try {
      await API.post('/tutor/courses', data);
      alert('Course added successfully');
      navigate('/tutor');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/tutor"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </a>
      </div>

      <main className="relative z-10 max-w-lg mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center justify-center mb-6">
            <PlusCircle className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Add New Course
            </h1>
          </div>

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="e.g. Advanced React"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Brief overview of the course..."
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (LKR)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="0"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjects *
              </label>
              <select
                name="subjects"
                multiple
                required
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                {subjects.length > 0 ? (
                  subjects.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading subjects...</option>
                )}
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image
              </label>
              <input
                type="file"
                name="thumbnailImage"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            {/* Study Docs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Study Documents (PDF, DOCX, JPG, PNG, TXT)
              </label>
              <input
                type="file"
                name="studyDocs"
                multiple
                accept=".pdf,.docx,.jpg,.jpeg,.png,.txt"
                onChange={handleChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;
