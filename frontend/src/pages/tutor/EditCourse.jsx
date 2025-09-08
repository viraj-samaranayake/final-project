import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api';
import { ArrowLeft } from 'lucide-react';

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
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
      <h1 className="text-2xl font-semibold mb-4">Edit Course</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title *</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded p-2 mt-1"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded p-2 mt-1"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnailImage"
            accept="image/png, image/jpeg"
            className="mt-1"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">
            Study Documents (Replace All)
          </label>
          <input
            type="file"
            name="studyDocs"
            multiple
            accept=".pdf,.docx,.jpg,.jpeg,.png,.txt"
            className="mt-1"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
