import { useEffect, useState } from 'react';
import API from '../../api';

const ScheduleClass = () => {
  const [form, setForm] = useState({
    title: '',
    course: '',
    scheduledAt: '',
    price: '',
  });
  const [courses, setCourses] = useState([]);
  const [msg, setMessage] = useState('');

  useEffect(() => {
    API.get('/tutor/my-courses').then((res) => setCourses(res.data));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'course' && value) setForm((prev) => ({ ...prev, price: '' }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const payload = {
      ...form,
      price: form.course ? 0 : Number(form.price),
    };

    try {
      const res = await API.post('/tutor/class', payload);
      if (form.course) {
        setMessage('Class scheduled and enrolled students notified!');
      } else {
        setMessage('Class scheduled successfully.');
      }
      setForm({ title: '', course: '', scheduledAt: '', price: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to schedule class');
    }
  };

  return (

  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
  {/* animated orbs */}
  <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />

  <main className="relative z-10 max-w-md mx-auto mt-12">
    <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Schedule a Class
      </h2>

      {msg && (
        <p className="mb-4 text-center text-green-700 bg-green-100/70 rounded-xl px-4 py-2">
          {msg}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="e.g. Programing fundamentals"
            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={onChange}
            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        {/* Course Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Related to Course
          </label>
          <select
            name="course"
            value={form.course}
            onChange={onChange}
            className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Not related to course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price (only when no course) */}
        {!form.course && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (Rs)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              placeholder="0.00"
              className="w-full bg-white/60 border border-white/40 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-800 to-purple-800 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Schedule Class
        </button>
      </form>
    </div>
  </main>
</div>
  );
}


export default ScheduleClass;