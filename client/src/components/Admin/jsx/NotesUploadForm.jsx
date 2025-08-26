import { useState } from 'react';
import { toast } from 'react-toastify'
import styles from '../css/NotesUploadForm.module.css';
import protectedApi from '../../../api/protectedApi.js';

const NotesUploadForm = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    title: '',
    image: null,
    pdf: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'pdf') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formSubmission = new FormData();
    formSubmission.append('topic', formData.topic);
    formSubmission.append('title', formData.title);
    formSubmission.append('image', formData.image);
    formSubmission.append('pdf', formData.pdf);

    try {
      const response = await protectedApi.post("/notes/create", formSubmission, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        withCredentials: true,
       });
      if (response.data?.success) {
        onClose();
        toast.success(response.data.message || "Notes added successfully");
      }
      else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      toast.error("Failed : Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h3 className={styles.formTitlecreate}>Upload Notes</h3>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <input name="topic" value={formData.topic} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
              <label className={styles.floatingLabel}>Topic</label>
            </div>

            <div className={styles.inputGroup}>
              <input name="title" value={formData.title} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
              <label className={styles.floatingLabel}>Title</label>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <input type="file" name="image" id="imageUpload" accept="image/*" className={styles.floatingInput} onChange={handleChange} />
              <label htmlFor="imageUpload" className={styles.floatingLabel}>Upload Thumbnail</label>
            </div>

            <div className={styles.inputGroup}>
              <input type="file" name="pdf" id="pdfUpload" accept="application/pdf" className={styles.floatingInput} onChange={handleChange} required />
              <label htmlFor="pdfUpload" className={styles.floatingLabel}>Upload PDF</label>
            </div>
          </div>

          <div className={styles.lastPart}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesUploadForm;
