import { useState, useEffect } from "react"
import CourseLog from "./CourseLog"
import ActivityLog from "./ActivityLog"
import ProfileDetails from "../../Utility-Student/jsx/ProfileDetails"
import Footer from "../../../Utility-all/Footer"
import Navbar from "../../Utility-Student/jsx/Navbar"
import styles from '../css/StudentHome.module.css'
import protectedApi from '../../../../api/protectedApi.js';


const StudentHome = () => {
  const [online_courses, setOnline_courses] = useState([]);
  const [offline_courses, setOffline_courses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  //group by topic of the course
  const groupCoursesByTopic = (courses) => {
    return courses.reduce((acc, course) => {
      const topic = course.topic?.trim().toLowerCase(); // Trim and lowercase
      if (!topic) return acc; // Skip if topic is undefined/null/empty   
      const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1); // Capitalize first letter
      if (!acc[capitalizedTopic]) {
        acc[capitalizedTopic] = [];
      }
      acc[capitalizedTopic].push(course);
      return acc;
    }, {});
  };

  //fetch opline couses
  useEffect(() => {
    protectedApi.get("/course/getOnlineCourses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const course = groupCoursesByTopic(response.data.course);
        setOnline_courses(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch offline courses
  useEffect(() => {
    protectedApi.get("/course/getOfflineCourses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const course = groupCoursesByTopic(response.data.course);
        setOffline_courses(course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //fetch notes
  useEffect(() => {
    protectedApi.get("/notes/view", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setNotes(response.data?.notes || []);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  //fetch playlists
  useEffect(() => {
    protectedApi.get("/playlist/view", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setPlaylists(response.data?.playlist || []);
      })
      .catch((err) => {
        console.error("Error fetching playlists:", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles["student-home-content"]}>
        <div className={styles["profile-info"]}>
          <ProfileDetails />
        </div>
        <div className={styles["details-section"]}>
          <div className={styles["content"]}>
            <ActivityLog /><br /><br />
            <CourseLog online_courses={online_courses} offline_courses={offline_courses} notes={notes} playlists={playlists} />
          </div>
          <div className={styles["footer-body"]}>
            <br /><hr /><Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentHome;
