import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from "../css/NewPassword.module.css";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline, logoFirebase, menuOutline, closeOutline } from "ionicons/icons";
import { authApi } from "../../../../api/authApi.js"

function NewPasswordTeacher() {
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.post("/teacher/passwordUpdate", { email, password });
      if (res.data?.success) {
        toast.success("Password updated successfully");
        toast.info("you are redirecting to login page..");
        navigate('/teachers/login');
      } else {
        toast(res.data?.message);
      }
    } catch (error) {
      console.error('Error in updating password:', error);
      toast.error("Something went wrong while updating the password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <header className={styles.newpassword_header}>
        <Link to="#" className={styles.newpassword_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>


        <nav className={styles.newpassword_nav}>
          <Link to="/home">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/our-goal">Our Goal</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/teachers/signup">Sign Up</Link>
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.close_btn} onClick={() => setSidebarOpen(false)}>
          <IonIcon icon={closeOutline} />
        </div>
        <Link to="/home" onClick={() => setSidebarOpen(false)}>Home</Link>
        <Link to="/about-us" onClick={() => setSidebarOpen(false)}>About Us</Link>
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our Goal</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/teachers/signup" onClick={() => setSidebarOpen(false)}>Sign Up</Link>
      </div>

      <section className={styles.newpassword_home}>
        <div className={styles.newpassword_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.newpassword_wrapper_login}>
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.newpassword_input_box}>
              <span className={styles.newpassword_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">New Password</label>
            </div>
            <div className={styles.newpassword_input_box}>
              <span className={styles.newpassword_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="confirmpassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>
            <button type="submit" className={styles.newpassword_btn} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            <div className={styles.newpassword_register_link}>
              <p>
                Go back to Login? <Link to="/teachers/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewPasswordTeacher;
