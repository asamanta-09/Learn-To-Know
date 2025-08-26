import { Link } from "react-router-dom";
import styles from '../css/StudentPart.module.css';

const StudentPart = () => {
  return (
    <>
      <section id="student" className={styles.studentSection}>
        <div>
          <div className={styles.studentSectionText}>
            <h2 className={styles.studentSection_Title}>For Students</h2>

            {/* Responsive image inside text block (only visible on small screens) */}
            <div className={styles.responsiveImage}>
              <img src="/student.webp" alt="Student engaging in learning" />
            </div>

            <p className={styles.studentSection_Paragraph}>
              “A good teacher is like a candle, it consumes itself to light the way for others.” - Mustafa Kemal Ataturk
            </p>
            <Link to="/students/login">
              <button className={styles.studentSection_button}>Explore Now</button>
            </Link>
          </div>

          {/* Default image on larger screens */}
          <div className={styles.studentSection_Img}>
            <img src="/student.webp" alt="Student engaging in learning" />
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentPart;
