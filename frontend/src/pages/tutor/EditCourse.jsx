import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import { ArrowLeft, Pencil } from 'lucide-react';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [studyDocs, setStudyDocs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/tutor/courses/${id}`)
      .then((res) => {
        setForm({
          title: res.data.title,
          description: res.data.description || '',
        });
      })
      .catch((err) => setError('Failed to load course', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnailImage') {
      setThumbnailImage(files[0]);
    } else if (name === 'studyDocs') {
      setStudyDocs(files);
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
    if (thumbnailImage) data.append('thumbnailImage', thumbnailImage);
    for (let i = 0; i < studyDocs.length; i++) {
      data.append('studyDocs', studyDocs[i]);
    }

    try {
      await API.patch(`/tutor/courses/${id}`, data);
      navigate('/tutor/my-courses');
      alert('Your Course update successful.');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
  //     {/* back link */}
  //     <div className="absolute top-6 left-6 z-20">
  //       <a
  //         href="/tutor/my-courses"
  //         className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
  //       >
  //         <ArrowLeft className="w-5 h-5" />
  //         <span className="font-medium">Back</span>
  //       </a>
  //     </div>
  //     <h1 className="text-2xl font-semibold mb-4">Edit Course</h1>
  //     {error && <p className="text-red-500">{error}</p>}
  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div>
  //         <label className="block font-medium">Title *</label>
  //         <input
  //           type="text"
  //           name="title"
  //           className="w-full border rounded p-2 mt-1"
  //           value={form.title}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>

  //       <div>
  //         <label className="block font-medium">Description</label>
  //         <textarea
  //           name="description"
  //           className="w-full border rounded p-2 mt-1"
  //           rows="4"
  //           value={form.description}
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div>
  //         <label className="block font-medium">Thumbnail Image</label>
  //         <input
  //           type="file"
  //           name="thumbnailImage"
  //           accept="image/png, image/jpeg"
  //           className="mt-1"
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <div>
  //         <label className="block font-medium">
  //           Study Documents (Replace All)
  //         </label>
  //         <input
  //           type="file"
  //           name="studyDocs"
  //           multiple
  //           accept=".pdf,.docx,.jpg,.jpeg,.png,.txt"
  //           className="mt-1"
  //           onChange={handleChange}
  //         />
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
  //         disabled={loading}
  //       >
  //         {loading ? 'Updating...' : 'Update Course'}
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* decorative orbs */}
      <div className="absolute top-20  left-10  w-72 h-72 bg-gradient-to-r from-blue-400  to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      {/* back link */}
      <div className="absolute top-6 left-6 z-20">
        <a
          href="/tutor/my-courses"
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </a>
      </div>

      <main className="relative z-10 max-w-3xl mx-auto pt-24 pb-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center justify-center mb-6">
            <Pencil className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Edit Course
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
                Study Documents (Replace All)
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'Updating...' : 'Update Course'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditCourse;
