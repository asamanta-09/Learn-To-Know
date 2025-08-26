import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline, logoFirebase, closeOutline, menuOutline } from 'ionicons/icons';
import styles from "../css/LoginForm.module.css";
import { authApi } from '../../../../api/authApi.js';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      localStorage.removeItem('token'); // clear old token
      const response = await authApi.post( "/student/login", { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('email', email);
        navigate('/students/home');
        toast.success(response.data?.message || "Logged in successfully");
      } else {
        toast.error(response.data?.message || "Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.error('Error sending login data:', error);
      toast.error("Failed : Something went wrong");
    }
  };


  return (
    <div>
      <header className={styles.login_header}>
        <Link to="#" className={styles.login_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>

        <nav className={styles.login_nav}>
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
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our Goal</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/students/signup" onClick={() => setSidebarOpen(false)}>Sign Up</Link>
      </div>

      <section className={styles.login_home}>
        <div className={styles.login_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>“Knowledge is the seed, learning is the rain.With patience and curiosity, wisdom blooms.A mind open to learning is a garden that never withers.”</p>
          <Link to="/students/signup">Get Started</Link>
        </div>
        <div className={styles.login_wrapper_login}>
          <h2>Student Login</h2>
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}>
                <IonIcon icon={mailOutline} />
              </span>
              <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Enter your email</label>
            </div>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Enter your password</label>
            </div>
            <div className={styles.login_remember_forgot}>
              <label> <input type="checkbox" /> Remember me </label>
              <Link to="/students/forget-password">Forgot Password?</Link>
            </div>
            {/* Error message display */}
            {error && <p className={styles.login_error_message}>{error}</p>}
            <button type="submit" className={styles.login_btn}> Login </button>
            <div className={styles.login_register_link}>
              <p> Not a member? <Link to="/students/signup">Sign Up</Link> </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
