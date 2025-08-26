import { useState } from 'react';
import styles from '../css/Review.module.css';
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [role, setRole] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for your review, ${name} (${role})!`);
    setName('');
    setComment('');
    setRating(0);
    setRole('');
  };


  return (
    <section className={styles.review_section}>
      <h2 className={styles.heading}>Give Your Review</h2>
      <form className={styles.review_form} onSubmit={handleSubmit}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => {
            const currentRating = i + 1;
            return (
              <label key={i}>
                <input type="radio" name="rating" value={currentRating} onClick={() => setRating(currentRating)} />
                <FaStar className={styles.star} color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'} size={30} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(0)} />
              </label>
            );
          })}
        </div>

        <input type="text" placeholder="Your Name" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
        <select name="role" id="role" className={styles.select} value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled>Select</option>
          <option value="learner">Learner</option>
          <option value="educator">Educator</option>
          <option value="visitor">Visitor</option>
        </select>

        <textarea placeholder="Your Review" className={styles.textarea} value={comment} onChange={(e) => setComment(e.target.value)} rows="4" required />
        <button type="submit" className={styles.submit_btn}>Submit Review</button>
      </form>
    </section>
  );
};

export default Review;
