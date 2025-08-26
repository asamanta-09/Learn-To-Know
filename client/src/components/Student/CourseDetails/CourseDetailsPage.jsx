import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Utility-Student/jsx/Navbar';
import styles from './CourseDetailsPage.module.css';
import protectedApi from '../../../api/protectedApi';

const CourseDetailsPage = () => {
  const location = useLocation();
  const courseDetails = location.state?.courseDetails || {};
  const [teacher, setTeacher] = useState(null);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      if (courseDetails.created_by?.[0]) {
        try {
          const response = await protectedApi.get("/teacher/getTeacherDetails?email=${courseDetails.created_by[0]}", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setTeacher(response.data || null);
        } catch (error) {
          console.error('Error fetching teacher details:', error);
          setTeacher(null);
        }
      }
    };
    fetchTeacherDetails();
  }, [courseDetails.created_by]);

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
                  <div><strong>Instructor:</strong> Prof. Akash Sen</div>
                  <div><strong>Enrolled By:</strong> 764 learners</div>
                </div>
                <div>
                  {courseDetails.starting_date && (
                    <div><strong>Start Date:</strong> {formatDate(courseDetails.starting_date)}</div>
                  )}
                  <div><strong>Mode:</strong> {courseDetails.mode}</div>
                  <div><strong>Duration:</strong> {courseDetails.duration}</div>
                </div>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.enrollBtn}>Enroll Now</button>
              </div>
            </div>
            <div className={styles.introImage}>
              <img src={courseDetails.thumbnail} alt="Course Image" />
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className={styles.overview}>
          <div className={styles.overviewText}>
            <h2>Course Overview</h2>
            <hr />
            <p>{courseDetails.course_overview}</p>
          </div>
        </section>

        {/* Sample Video */}
        <section className={styles.videoSection}>
          <h2>Introduction Video</h2>
          <hr />
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
              {(courseDetails.outcomes ?? []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Instructor Details */}
        <section className={styles.instructorDetails}>
          <h2>About the Instructor</h2>
          <hr />
          {teacher ? (
            <div className={styles.instructorCard}>
              <div className={styles.instructorInfo}>
                <img
                  src="/img-prof.png"
                  alt="Instructor"
                  className={styles.instructorPhoto}
                />
                <div className={styles.academicDetails}>
                  <h4>Academic Qualifications:</h4>
                  {teacher.academic_details && teacher.academic_details.length > 0 ? (
                    <ul className={styles.ul}>
                      {teacher.academic_details.map((item, idx) => (
                        <li key={idx}>
                          {item.qualification} - {item.qualifying_institution}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No academic qualifications found.</p>
                  )}
                </div>
              </div>
              <div className={styles.instructorInfo}>
                <h3>{teacher.name}</h3>
                <p><strong>Email:</strong> {teacher.email}</p>
                <p><strong>Phone:</strong> +91 {teacher.phone_no}</p>
                <p><strong>Gender:</strong> {teacher.gender}</p>
                <p><strong>Profession:</strong> {teacher.profession}</p>
                <p><strong>Works at:</strong> {teacher.worksAt}</p>
                <p><strong>Job Role:</strong> {teacher.job_role}</p>
                <p>
                  <strong>About:</strong> Passionate about building Java skills from basics to advanced concepts.
                  With 15+ years of teaching experience at premier institutes.
                </p>
              </div>
            </div>
          ) : (
            <p>Loading instructor details...</p>
          )}
        </section>

        {/* Prerequisites */}
        <section className={styles.prerequisiteDetails}>
          <h2>Prerequisites</h2>
          <hr />
          <ul className={`${styles.prerequisites} ${styles.ul}`}>
            {(courseDetails.prerequisite ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.prerequisiteDetails}>
          <h2>Reviews</h2>
          <hr />
          <h5>This part is in under construction</h5>
        </section>

        <section className={styles.prerequisiteDetails}>
          <h2>Feedback</h2>
          <hr />
          <h5>This part is in under construction</h5>
        </section>
      </div>
    </>
  );
};

export default CourseDetailsPage;
