import { useState, useEffect } from 'react';
import NotesUploadForm from './NotesUploadForm';
import styles from '../css/AddNotes.module.css';
import protectedApi from '../../../api/protectedApi.js';


const AddNotes = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOpenForm = () => {
    setShowForm(true);
  }

  const handleClick = (url) => {
    const previewUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(previewUrl, '_blank');
  };


  useEffect(() => {
    protectedApi.get("/notes/view", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((response) => {
        setNotes(response.data?.notes || []);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  return (
    <>
      <h2 className={styles.sectionTitle}>Notes</h2>
      <div className={styles.notesWrapper}>
        <div className={`${styles.noteCard} ${styles.addNew}`} onClick={handleOpenForm} >
          <span>+</span>
          <p>Add new Note</p>
        </div>
        {notes.map((note) => (
          <div key={note._id} className={styles.noteCard} onClick={() => handleClick(note.pdf)}>
            <img src={note.image} alt={note.title} className={styles.noteImage} />
            <p className={styles.noteTitle}>{note.title}</p>
          </div>
        ))}
      </div>
      {showForm && <NotesUploadForm onClose={handleCloseForm} />}
    </>
  );
};

export default AddNotes;
