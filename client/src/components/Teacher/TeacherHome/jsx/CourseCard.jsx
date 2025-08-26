import { useNavigate } from 'react-router-dom';
import styles from '../css/CourseCard.module.css'

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const handleClick = (course) => {
    navigate('/teachers/course-details', { state: { courseDetails: course } });
  };

  return (
    <div className={styles['card']}>
      <div className={styles['image']}>
        <img src={course.thumbnail} alt="Course" />
      </div>
      <div className={styles['content']}>
        <h4>{course.name || course.course_title}</h4>
        <hr className={styles['underline']} />
        <p>Type : {course.course_level} <br /> Mode : {course.mode}</p>
      </div>
      <div className={styles['button']}>
        <button onClick={() => handleClick(course)}>Details</button>
      </div>
    </div>
  );
};

export default CourseCard;
