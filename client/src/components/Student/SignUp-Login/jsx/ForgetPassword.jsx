import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import styles from "../css/ForgetPassword.module.css";
import { IonIcon } from "@ionic/react";
import { mailOutline, logoFirebase, arrowBackOutline, closeOutline, menuOutline } from 'ionicons/icons';
import { authApi } from '../../../../api/authApi.js';

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const name = "Student";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.post("/student/generateOTP", { email, name });
      if(response.data?.success){
        toast.success(response.data?.message)
        navigate('/students/password-otp', { state: { email } });
      }
      else{
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.error('Error sending login data:', error);
      toast.error("Failed:Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={styles.forgetpassword_header}>
        <Link to="#" className={styles.forgetpassword_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>
        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>
        <nav className={styles.forgetpassword_nav}>
          <Link to="/home">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/our-goal">Our Goal</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/students/signup">Sign Up</Link>
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.close_btn} onClick={() => setSidebarOpen(false)}>
          <IonIcon icon={closeOutline} />
        </div>
        <Link to="/home" onClick={() => setSidebarOpen(false)}>Home</Link>
        <Link to="/about-us" onClick={() => setSidebarOpen(false)}>About Us</Link>
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our Gola</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/students/signup" onClick={() => setSidebarOpen(false)}>Sign Up</Link>
      </div>

      <section className={styles.forgetpassword_home}>
        <div className={styles.forgetpassword_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.forgetpassword_wrapper_login}>
          <h2>Student Login</h2>
          <h4>Forget password? Not a problem!</h4>
          <form onSubmit={handleSubmit}>
            <div className={styles.forgetpassword_input_box}>
              <span className={styles.forgetpassword_icon}>
                <IonIcon icon={mailOutline} />
              </span>
              <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Enter your email</label>
            </div>

            <button type="submit" className={styles.forgetpassword_btn} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button> 

            <div className={styles.forgetpassword_register_link}>
              <p>
                <IonIcon icon={arrowBackOutline} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                Go back to <Link to="/students/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
