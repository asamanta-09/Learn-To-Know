import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import styles from './ReviewSection.module.css';
import protectedApi from '../../../api/protectedApi';

const ReviewSection = ({ courseId, courseDetails }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const studentEmail = localStorage.getItem('email');

  useEffect(() => {
    checkEnrollmentStatus();
    fetchReviews();
  }, [courseId]);

  const checkEnrollmentStatus = async () => {
    try {
      const response = await protectedApi.get(`/course/${courseId}/check-enrollment?studentEmail=${studentEmail}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsEnrolled(response.data.isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await protectedApi.get(`/course/${courseId}/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReviews(response.data.course.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleCommentChange = (e) => {
    setFormData(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (formData.comment.trim().length < 10) {
      toast.error('Review comment must be at least 10 characters long');
      return;
    }

    const studentId = localStorage.getItem('studentId');
    const studentName = localStorage.getItem('studentName');

    if (!studentId || !studentName) {
      toast.error('Student information not found. Please login again.');
      return;
    }

    setReviewLoading(true);
    try {
      const response = await protectedApi.post(`/course/${courseId}/review`, {
        studentId,
        studentName,
        rating: formData.rating,
        comment: formData.comment.trim()
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        toast.success('Review submitted successfully!');
        setFormData({ rating: 0, comment: '' });
        setShowReviewForm(false);
        fetchReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? styles.starFilled : styles.starEmpty}
        size={16}
      />
    ));
  };

  return (
    <section className={styles.reviewSection}>
      <h2>Reviews & Ratings</h2>
      <hr />

      {/* Course Rating Summary */}
      <div className={styles.ratingSummary}>
        <div className={styles.overallRating}>
          <div className={styles.ratingNumber}>
            {courseDetails.average_rating ? courseDetails.average_rating.toFixed(1) : '0.0'}
          </div>
          <div className={styles.stars}>
            {renderStars(Math.round(courseDetails.average_rating || 0))}
          </div>
          <div className={styles.totalReviews}>
            {courseDetails.total_reviews || 0} reviews
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      {isEnrolled && !showReviewForm && (
        <div className={styles.addReviewSection}>
          <button
            className={styles.addReviewBtn}
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className={styles.reviewForm}>
          <h3>Write Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className={styles.ratingInput}>
              <label>Rating:</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= formData.rating ? styles.starFilled : styles.starEmpty}
                    size={24}
                    onClick={() => handleRatingChange(star)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.commentInput}>
              <label htmlFor="comment">Your Review:</label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={handleCommentChange}
                placeholder="Share your experience with this course..."
                rows={4}
                maxLength={500}
                required
              />
              <div className={styles.charCount}>
                {formData.comment.length}/500 characters
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setShowReviewForm(false);
                  setFormData({ rating: 0, comment: '' });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={reviewLoading}
              >
                {reviewLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className={styles.reviewsList}>
        <h3>Student Reviews</h3>

        {loading ? (
          <div className={styles.loading}>Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className={styles.noReviews}>
            <p>No reviews yet. Be the first to review this course!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerName}>{review.student_name}</div>
                  <div className={styles.reviewDate}>
                    {formatDate(review.created_at)}
                  </div>
                </div>
                <div className={styles.reviewRating}>
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className={styles.reviewComment}>
                {review.comment}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
