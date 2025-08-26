import AddNotes from "./AddNotes";
import AddReferenceVideos from "./AddReferenceVideos";
import styles from '../css/AdminHome.module.css';
import Statistics from "./Statistics";
import Navbar from "./Navbar";

const AdminHome = () => {
  return (
    <>
      <Navbar />
      <div className={styles.adminContainer}>
        <h3 className={styles['welcome']}>Welcome Admin</h3>
        <AddNotes />
        <AddReferenceVideos />
        <Statistics />
      </div>
    </>
  );
};

export default AdminHome;
