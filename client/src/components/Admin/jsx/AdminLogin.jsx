import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AdminLogin.module.css';
import { authApi } from '../../../api/authApi.js';

const AdminLogin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);

    try {
      localStorage.removeItem('token'); // clear old token
      const response = await authApi.post("/admin/login", { username, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data?.accessToken);
        localStorage.setItem('email', username);
        navigate('/admins/home');
        toast.success("Welcome back Admin");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Error sending login data:', error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleForm} >
          <div className={styles.inputGroup}>
            <input type="text" name="username" placeholder="Username" ref={usernameRef} required className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" name="password" placeholder="Password" ref={passwordRef} required className={styles.input} />
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
