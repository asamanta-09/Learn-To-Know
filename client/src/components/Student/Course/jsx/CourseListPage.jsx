import { useLocation } from 'react-router-dom';
import CourseCard from "./CourseCard";
import Footer from '../../../Utility-all/Footer'
import Navbar from '../../Utility-Student/jsx/Navbar'
import ProfileDetails from '../../Utility-Student/jsx/ProfileDetails'
import styles from '../css/CourseListPage.module.css'

const CourseListPage = () => {
  const location = useLocation(); // Get passed data
  const courseData = location.state?.courseData || {};
  const courseList = Array.isArray(courseData) ? courseData : [courseData];
  return (
    <>
      <Navbar />
      <div className={styles['course-list-page']}>
        <div className={styles['profile-info']}>
          <ProfileDetails />
        </div>
        <div className={styles['details-section']}>
          <div className={styles["heading"]}>
            <h3>{courseData.length > 0 ? `All Courses of ${courseData[0].topic}` : "Course List"}</h3>
            <hr className={styles['hr-heading']} />
          </div>
          <div className={styles['content']}>
            {
              courseList.map(course => (
                <CourseCard course={course} />
              ))
            }
          </div>
          <div className={styles['footer-body']}>
            <br /><hr /><Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseListPage
