import styles from '../css/CourseLog.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const CourseLog = ({ online_courses, offline_courses, notes, playlists }) => {
  const navigate = useNavigate();
  const handleClick = async (course) => {
    navigate('/students/courses', { state: { courseData: course } });
  };

  const extractYouTubeVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1);
      } else if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleNoteClick = (url) => {
    const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(previewUrl, '_blank');
  };

  return (
    <div className={styles['course-log']}><br />
      {/* Online Courses Section */}
      <div className={styles['online-courses']}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Online Courses</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {Object.entries(online_courses).map(([topic, courses]) => (
            <div key={courses._id} onClick={() => handleClick(courses)}>
              <div className={styles["course-card-item"]}>
                <img src="/course_online.png" alt={courses.topic} />
                <div className={styles['course-card-title']}>{topic}</div>
                <div className={styles["arrow"]}><FaArrowRight /></div>
              </div>
            </div>
          ))}
        </div>
      </div><br /><br />

      {/* Offline Courses Section */}
      <div className={styles["offline-courses"]}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Offline Courses</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {Object.entries(offline_courses).map(([topic, courses]) => (
            <div key={courses._id} onClick={() => handleClick(courses)}>
              <div className={styles["course-card-item"]}>
                <img src="/course_offline.png" alt={courses.topic} />
                <div className={styles['course-card-title']}>{topic}</div>
                <div className={styles["arrow"]}><FaArrowRight /></div>
              </div>
            </div>
          ))}
        </div>
      </div><br /><br />

      {/* Notes Section */}
      <div className={styles["notes-section"]}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Notes</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index} onClick={() => handleNoteClick(note.pdf)}>
                <div className={styles["course-card-item"]}>
                  <img src={note.image} alt={note.topic} />
                  {/* <div className={styles['inside-image-notes']}>{note.title}</div> */}
                  <div className={styles['course-card-title']}>{note.topic}</div>
                  <div className={styles["arrow"]}><FaArrowRight /></div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ margin: "1rem", fontStyle: "italic" }}>No notes available to display.</p>
          )}
        </div>
      </div>

      {/* playlists section */}
      <div className={styles["playlist-section"]}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Videos </h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {
            playlists && playlists.length > 0 ? (
              playlists.map((playlist, index) => {
                const videoId = extractYouTubeVideoId(playlist.youtube_link);
                const image = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : playlist.image;
                return (
                  <Link key={index} to={playlist.youtube_link} target="_blank" rel="noopener noreferrer" className={styles['course-card-item']} >
                    <img src={image} onError={(e) => { e.target.src = playlist.image }} alt={playlist.title} />
                    <div className={styles['course-card-title']}>{playlist.topic}</div>
                    <div className={styles["arrow"]}><FaArrowRight /></div>
                  </Link>
                );
              })
            ) : (
              <p style={{ margin: "1rem", fontStyle: "italic" }}>No playlist available to display.</p>
            )
          }
        </div>
      </div>

    </div>
  );
};

export default CourseLog;
