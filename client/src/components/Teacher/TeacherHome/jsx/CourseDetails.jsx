import Navbar from './Navbar';
import { useLocation ,Link } from 'react-router-dom';
import styles from '../css/CourseDetails.module.css';

const CourseDetailsPage = () => {
  const location = useLocation();
  const courseDetails = location.state?.courseDetails || {};

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Heading Title */}
        <section className={styles.headingTitle}>
          <h1>{courseDetails.course_title}</h1>
          <hr />
        </section>

        {/* Course Intro */}
        <section className={styles.courseIntro}>
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <div className={styles.infoGrid}>
                <div>
                  <div><strong>Rating:</strong> ★★★★☆ 4.6/5</div>
                  <div><strong>Type:</strong> {courseDetails.course_level}</div>
                  <div><strong>Instructor:</strong> {courseDetails.created_by}</div>
                  <div><strong>Enrolled By:</strong> 764 learners</div>
                </div>
                <div>
                  {courseDetails.starting_date && <div><strong>Start Date:</strong> {formatDate(courseDetails.starting_date)}</div>}
                  <div><strong>Mode:</strong> {courseDetails.mode}</div>
                  <div><strong>Duration:</strong> {courseDetails.duration}</div>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.editBtn}>Edit</button>
                <Link to='/teachers/home' className={styles.backBtn} >Back</Link>
              </div>
            </div>
            <div className={styles.introImage}>
              <img src={courseDetails.thumbnail} alt="Unable to view course image" />
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className={styles.overview}>
          <div className={styles.overviewText}>
            <h2>Course Overview</h2>
            <hr />
            <p> {courseDetails.course_overview} </p>
          </div>
        </section>

        {/* Sample Video */}
        <section className={styles.videoSection}>
          <h2>Introduction Video</h2><hr />
          <div className={styles.videoContainer}>
            <iframe
              src={courseDetails.demovideo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Introduction Video"
            ></iframe>
          </div>
        </section>

        {/* Topics Covered */}
        <section className={styles.topicsCovered}>
          <div className={styles.topicsText}>
            <h2>Course Curriculum</h2>
            <hr />
            <ul className={styles.ul}>
              {(courseDetails.outcomes || []).map((item, index) => {
                return <li key={item._id}>{item}</li>;
              })}
            </ul>
          </div>
        </section>

        {/* Prerequisites */}
        <section className={styles.prerequisiteDetails}>
          <h2>Prerequisites</h2>
          <hr />
          <ul className={`${styles.prerequisites} ${styles.ul}`}>
            {(courseDetails.prerequisite || []).map((item, index) => {
              return <li key={item._id}>{item}</li>;
            })}
          </ul>
        </section>
      </div>
    </>
  );
};

export default CourseDetailsPage;
