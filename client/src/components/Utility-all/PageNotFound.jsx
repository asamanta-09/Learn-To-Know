import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.img}>
        <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="Image not found" />
        <h3>Under Construction</h3>
        <p>The page you are looking for is not available!</p>
         <Link to="/" className={styles.btn}>
            <FaArrowLeft className={styles.icon} />
            <span>Back</span>
          </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
