import Navbar from './Navbar';
import ProfileDetails from './ProfileDetails'
import Footer from '../../../Utility-all/Footer'
import Statistics from './Statistics';
import ProvidedCourses from './ProvidedCourses';
import AddNewCourse from './AddNewCourse';
import styles from '../css/TeacherHome.module.css'

const TeacherHome = () => {
  return (
    <>
      <Navbar />
      <div className={styles["teacher-home-content"]}>
        <div className={styles["profile-info"]}>
          <ProfileDetails />
        </div>
        <div className={styles["details-section"]}>
          <div className={styles["content"]}>
            <AddNewCourse />
            <Statistics />
            <ProvidedCourses />
          </div>
          <div className={styles["footer-body"]}>
            <br /><hr /><Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherHome;
