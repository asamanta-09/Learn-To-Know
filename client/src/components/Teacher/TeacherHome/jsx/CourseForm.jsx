import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../css/CourseForm.module.css';
import protectedApi from '../../../../api/protectedApi.js';


const CourseForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    course_title: '',
    topic: '',
    mode: '',
    starting_date: '',
    duration: '',
    course_overview: '',
    course_level: '',
    outcomes: '',
    topics_covered: '',
    prerequisite: '',
    demovideo: '',
    thumbnail: null
  });
  const email = localStorage.getItem('email');
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDemoLink = formData.demovideo.replace('view?usp=drive_link', 'preview');

    // Prepare values for submission
    const valuesToAppend = {
      ...formData,
      demovideo: updatedDemoLink,
      outcomes: formData.outcomes.split('\n').filter(line => line.trim() !== ''),
      topics_covered: formData.topics_covered.split('\n').filter(line => line.trim() !== ''),
      prerequisite: formData.prerequisite.split('\n').filter(line => line.trim() !== ''),
    };

    const submissionData = new FormData();

    // Append all fields except 'thumbnail' dynamically
    Object.entries(valuesToAppend).forEach(([key, value]) => {
      if (key === 'thumbnail') return; // skip file for now
      submissionData.append(key, value);
    });

    // Append thumbnail only if it exists
    if (formData.thumbnail) {
      submissionData.append('thumbnail', formData.thumbnail);
    }
    submissionData.append('email', email);

    try {
      const response = await protectedApi.post("/course/createCourse", submissionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if(response.data?.success){
        toast.success(response.data?.message || "Course added successfully");
        onSubmit();
      }
    } catch (error) {
      console.error('Upload error:', error.response?.data || error.message);
      toast.error("Failed: Something went wrong");
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3 className={styles.formTitlecreate}>Create a Course</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <input name="course_title" value={formData.course_title} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
                <label className={styles.floatingLabel}>Course Title</label>
              </div>

              <div className={styles.inputGroup}>
                <input name="topic" value={formData.topic} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
                <label className={styles.floatingLabel}>Topic (e.g., Java, Python)</label>
              </div>

              <div className={styles.inputGroup}>
                <select name="mode" value={formData.mode} onChange={handleChange} className={styles.floatingInput} required>
                  <option value="" disabled hidden>select</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <label className={styles.floatingLabel}>Mode</label>
              </div>

              <div className={styles.inputGroup}>
                <input type="date" name="starting_date" value={formData.starting_date} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
                <label className={styles.floatingLabel}>Starting Date</label>
              </div>

              <div className={styles.inputGroup}>
                <input name="duration" value={formData.duration} onChange={handleChange} placeholder=" " className={styles.floatingInput} required />
                <label className={styles.floatingLabel}>Duration (e.g., 6 weeks)</label>
              </div>

              <div className={styles.inputGroup}>
                <select name="course_level" value={formData.course_level} onChange={handleChange} className={styles.floatingInput} required>
                  <option value="" disabled hidden>select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <label className={styles.floatingLabel}>Course Level</label>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <textarea name="course_overview" value={formData.course_overview} onChange={handleChange} placeholder=" " className={styles.floatingInput} rows={2} />
              <label className={styles.floatingLabel}>Course Overview</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea name="outcomes" value={formData.outcomes} onChange={handleChange} placeholder=" " className={styles.floatingInput} rows={2} />
              <label className={styles.floatingLabel}>Course Outcomes</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea name="topics_covered" value={formData.topics_covered} onChange={handleChange} placeholder=" " className={styles.floatingInput} rows={2} />
              <label className={styles.floatingLabel}>Topics Covered</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea name="prerequisite" value={formData.prerequisite} onChange={handleChange} placeholder=" " className={styles.floatingInput} rows={2} />
              <label className={styles.floatingLabel}>Prerequisite</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea name="demovideo" value={formData.demovideo} onChange={handleChange} placeholder="           Upload google frive upload link(make sure it is public) " className={styles.floatingInput} rows={1} />
              <label className={styles.floatingLabel}>Demo Video</label>
            </div>

            <div className={styles.lastPart}>
              <div className={styles.inputGroup} style={{ width: '55%' }}>
                <input type="file" name="thumbnail" id="fileUpload" className={styles.floatingInput} onChange={handleChange} />
                <label htmlFor="fileUpload" className={styles.floatingLabel} required >Upload Photo</label>
              </div>
              <button type="submit" className={styles.submitButton}>Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseForm;
