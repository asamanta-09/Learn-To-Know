import { Link } from 'react-router-dom';
import styles from '../css/TeacherPart.module.css';

const TeacherPart = () => {
  return (
    <>
      <section className={styles.teacherSection}>
        <div>
          {/* Default image - visible on large screens */}
          <div className={styles.teacherSection_Img}>
            <img src="/teacher.png" alt="Teacher illustration" />
          </div>

          <div className={styles.teacherSectionText}>
            <h2 className={styles.teacherSection_Title}>For Teachers'</h2>

            {/* Responsive image - visible on small screens */}
            <div className={styles.responsiveImage}>
              <img src="/teacher.png" alt="Teacher illustration" />
            </div>

            <p className={styles.teacherSection_Paragraph}>
              Here teachers can upload their profile and course details which they want to teach. Students who are looking for teachers can easily reach them through our website.
            </p>

            <Link to="/teachers/login">
              <button className={styles.teacherSection_button}>Explore Now</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeacherPart;
