import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReferenceUploadForm from './ReferenceUploadForm';
import styles from '../css/AddReferenceVideos.module.css';
import  protectedApi  from '../../../api/protectedApi.js';


const AddReferenceVideos = () => {
  const [showForm, setShowForm] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleOpenForm = () => {
    setShowForm(true);
  }

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


useEffect(() => {
  protectedApi.get("/playlist/view", { 
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
   })
    .then((response) => {
      setPlaylist(response.data?.playlist || []);
    })
    .catch((err) => {
      console.error("Error fetching playlists:", err);
    });
}, []);


  return (
    <>
      <h2 className={styles.sectionTitle}>Reference Videos</h2>
      <div className={styles.notesWrapper}>
        <div className={styles.noteCard + " " + styles.addCard} onClick={handleOpenForm}>
          <p className={styles.addIcon}>+</p>
          <p className={styles.addText}>Add New Playlist</p>
        </div>

        {playlist.map((playlist) => {
          const videoId = extractYouTubeVideoId(playlist.youtube_link);
          const image = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : playlist.image;

          return (
            <Link
              key={playlist._id}
              to={playlist.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.noteCard}
            >
              <img
                src={image}
                onError={(e) => { e.target.src = playlist.image }}
                alt={playlist.title}
                className={styles.thumbnail}
              />
              <p className={styles.noteTitle}>{playlist.title}</p>
            </Link>
          );
        })}
      </div>
      {showForm && <ReferenceUploadForm onClose={handleCloseForm} />}
    </>
  );
};

export default AddReferenceVideos;
