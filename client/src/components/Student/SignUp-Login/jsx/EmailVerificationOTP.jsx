import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from "../css/EnterOTP.module.css";
import { IonIcon } from "@ionic/react";
import { logoFirebase, keyOutline, arrowBackOutline, menuOutline, closeOutline } from "ionicons/icons";
import { authApi } from '../../../../api/authApi.js';


function EmailVerificationOTP() {
  const [otp, setOTP] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { studentData } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentData) {
      toast.error("No student data found, please restart signup.");
      navigate("/students/signup");
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await authApi.post("/student/verifyOTP", { email: studentData.email, otp });
      if (!verifyRes.data.success) {
        toast.error(verifyRes.data?.message || "OTP verification failed");
        return;
      }
      const signUpRes = await authApi.post("/student/signUp", studentData);
      if (signUpRes.data.success) {
        toast.success(signUpRes.data?.message || "Signup successful");
        navigate("/students/login");
      } else {
        toast.error(signUpRes.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during verification/sign up:", error);
      toast.error(error.response?.data?.message || "Failed: Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <header className={styles.enterotp_header}>
        <Link to="#" className={styles.enterotp_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>

        <nav className={styles.enterotp_nav}>
          <Link to="/home">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/our-goal">Our Goal</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/students/login">Login</Link>
        </nav>
      </header>

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

      <section className={styles.enterotp_home}>
        <div className={styles.enterotp_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.enterotp_wrapper_login}>
          <h2>Email Verification</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.enterotp_input_box}>
              <span className={styles.enterotp_icon}>
                <IonIcon icon={keyOutline} />
              </span>
              <input type="text" id="otp" value={otp} required onChange={(e) => setOTP(e.target.value)} />
              <label htmlFor="otp">Enter OTP</label>
            </div>
            <button type="submit" className={styles.enterotp_btn} disabled={loading}>
              {loading ? 'Verifying...' : 'Submit'}
            </button>
            <div className={styles.enterotp_register_link}>
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

export default EmailVerificationOTP;
