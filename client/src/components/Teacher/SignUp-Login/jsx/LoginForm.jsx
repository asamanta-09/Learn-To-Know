import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../css/LoginForm.module.css";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline, logoFirebase, menuOutline, closeOutline } from 'ionicons/icons';
import { authApi } from "../../../../api/authApi.js"


function LoginPageTeacher() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.post("/teacher/login", { email, password });

      if (response.data?.success) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('email', email);
        toast.success(response.data?.message || "Logged In successfully");
        navigate('/teachers/home');
      } else {
        toast.error(response.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error('Error sending login data:', error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginBody}>
      {/* Header */}
      <header className={styles.login_header}>
        <Link to="#" className={styles.login_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>

        {/* Navigation links for large screens */}
        <nav className={styles.login_nav}>
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
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our goal</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/teachers/signup" onClick={() => setSidebarOpen(false)}>Sign Up</Link>
      </div>

      {/* Main Content */}
      <section className={styles.login_home}>
        <div className={styles.login_content}>
          <h3>Learning is a journey,<br /> not a destination</h3>
          <p>“Knowledge is the seed, learning is the rain..."</p>
          <Link to="/teachers/signup">Get Started</Link>
        </div>
        <div className={styles.login_wrapper_login}>
          <h2>Teacher Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}><IonIcon icon={mailOutline} /></span>
              <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <label>Enter your email</label>
            </div>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}><IonIcon icon={lockClosedOutline} /></span>
              <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <label>Enter your password</label>
            </div>
            <div className={styles.login_remember_forgot}>
              <label><input type="checkbox" /> Remember me</label>
              <Link to="/teachers/forget-password">Forgot Password?</Link>
            </div>
            {error && <p className={styles.login_error_message}>{error}</p>}
            <button type="submit" className={styles.login_btn} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className={styles.login_register_link}>
              <p>Not a member? <Link to="/teachers/signup">Sign Up</Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPageTeacher;
