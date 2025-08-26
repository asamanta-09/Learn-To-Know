import styles from '../css/ActivityLog.module.css'
import { FaArrowRight } from "react-icons/fa";

const ActivityLog = () => {
  return (
    <div>
      <h4 className={styles['activity-log-title']}><p>Activity Log</p></h4>
      <hr className={styles['hr-underline']} />
      <div className={styles["activity-card-items"]}>
        <a href="/">
          <div className={styles["activity-card"]}>
            <img src="/enrolled-image.jpg" alt="not found" />
            <div className={styles['activity-card-title']}>Enrolled Courses</div>
            <div className={styles["arrow"]}><FaArrowRight /></div>
          </div>
        </a>
        <a href="/">
          <div className={styles["activity-card"]}> 
            <img src="/ongoing-image.webp" alt="not found" />
            <div className={styles['activity-card-title']}>Ongoing Courses</div>
            <div className={styles["arrow"]}><FaArrowRight /></div>
          </div>
        </a>
        <a href="/">
          <div className={styles["activity-card"]}>
            <img src="/completed-image.jpg" alt="not found" />
            <div className={styles['activity-card-title']}>Completed Courses</div>
            <div className={styles["arrow"]}><FaArrowRight /></div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ActivityLog
