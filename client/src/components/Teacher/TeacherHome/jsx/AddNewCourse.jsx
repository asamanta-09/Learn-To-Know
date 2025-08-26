import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import styles from '../css/AddNewCourse.module.css';

const AddNewCourse = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCourse = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const afterSubmit = () => {
    setShowForm(false);
  }

  return (
    <>
      <div className={styles['addnew-title-h4']}>
        <h4>Add New Course</h4><hr />
      </div>
      <div className={styles['add-card']} onClick={handleAddCourse}>
        <div className={styles['add-symbol']}>+</div>
        <p className={styles['add-text']}>Add New Course</p>
      </div>

      {showForm && <CourseForm onSubmit={afterSubmit} onClose={handleCloseForm} />}
    </>
  );
};

export default AddNewCourse;
