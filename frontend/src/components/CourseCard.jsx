import { useState } from 'react';
import API from '../api';
import RatingStars from 'react-rating-stars-component';

const CourseCard = ({ course }) => {
  const [docs, setDocs] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [rated, setRated] = useState(false);

  const loadDocs = async () => {
    const res = await API.get(`/student/purchased-courses/${course._id}/docs`);
    setDocs(res.data.studyDocs);
  };

  const submitFeedback = async () => {
    await API.post(`/student/purchased-courses/${course._id}/rate`, {
      stars: rating,
      comment,
    });
    setRated(true);
  };

  return (
    <div className="border rounded p-4 shadow">
      <h3 className="text-xl font-medium">{course.title}</h3>
      <p className="mt-2 mb-2">By: {course.tutor.name}</p>
      <button className="text-blue-600 hover:underline" onClick={loadDocs}>
        {docs.length ? 'Refresh Docs' : 'Show Documents'}
      </button>

      {docs.length > 0 && (
        <ul className="mt-2 list-disc list-inside">
          {docs.map((url, idx) => (
            <li key={idx}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Document {idx + 1}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        {/* Star Rating */}
        <div className="flex space-x-1 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer transition-colors ${
                (hoverRating || rating) >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              } ${rated ? 'pointer-events-none' : ''}`}
              onMouseEnter={() => !rated && setHoverRating(star)}
              onMouseLeave={() => !rated && setHoverRating(0)}
              onClick={() => !rated && setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment + Submit */}
        {!rated && (
          <div className="mt-3">
            <textarea
              placeholder="Leave a comment"
              className="w-full border rounded p-2 mt-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={submitFeedback}
              className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
            >
              Submit Feedback
            </button>
          </div>
        )}

        {/* Optional: show rating after submitting */}
        {rated && (
          <p className="mt-2 text-green-600">Thanks for your feedback!</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
