import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import styles from '../css/ProvidedCourses.module.css'
import protectedApi from '../../../../api/protectedApi.js';

const ProvidedCourses = () => {
  const [online_courses, setOnline_courses] = useState([]);
  const [offline_courses, setOffline_courses] = useState([]);
  const email = localStorage.getItem('email');
  const navigate=useNavigate();

  useEffect(() => {
    protectedApi.post("/course/getOnlineCoursesByTeacher", { email }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((response) => {
        const course = response.data.courses;
        setOnline_courses(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [online_courses]);

  useEffect(() => {
    protectedApi.post("/course/getOfflineCoursesByTeacher", { email }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((response) => {
        const course = response.data.courses;
        setOffline_courses(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offline_courses]);

  const handleClick=(course)=>{
    navigate("/teachers/course-details",{ state: { courseDetails:course } })
  }

  return (
    <>
      <div><br />
        {/* Online Courses Section */}
        <div className={styles['online-courses']}>
          <div className={styles["course-log-title"]}>
            <div className={styles["course-log-title-h4"]}>
              <h4>Provided Online Courses</h4>
            </div>
          </div>
          <hr className={styles['hr-underline']} />
          <div className={styles["course-cards"]}>
            {online_courses?.length === 0 ? (
              <p>No course to display</p>
            ) : (
              online_courses.map((course) => ( 
                <div key={course._id} className={styles['course-card-item']} onClick={() => handleClick(course)}>
                  <CourseCard course={course} />
                </div>
              ))
            )}
          </div>
        </div>
        <br /><br />


        {/* Offline Courses Section */}
        <div className={styles["offline-courses"]}>
          <div className={styles["course-log-title"]}>
            <div className={styles["course-log-title-h4"]}>
              <h4>Provided Offline Courses</h4>
            </div>
          </div>
          <hr className={styles['hr-underline']} />
          <div className={styles["course-cards"]}>
            {offline_courses?.length === 0 ? (
              <p>No course to display</p>
            ) : (
              offline_courses.map((course) => (
                <div key={course._id} className={styles['course-card-item']} onClick={() => handleClick(course)}>
                  <CourseCard course={course} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProvidedCourses;
