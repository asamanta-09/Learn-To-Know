import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ProfileCardDropDown.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { toast } from 'react-toastify';
import protectedApi from '../../../../api/protectedApi.js';

const ProfileCardDropDown = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "View Profile", action: () => navigate('/profile') },
    { label: "Edit Profile", action: () => navigate('/edit-profile') },
    { label: "Settings and Privacy", action: () => navigate('/settings') },
    {
      label: "Logout", action: async () => {
        if (loading) return;
        setLoading(true);
        try {
          const response = await protectedApi.post("/teacher/logout", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          if (response.data?.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate("/teachers/login");
            toast.success(response.data?.message || "Logged Out Successfully");
          }
          else {
            toast.error(response.data?.message || "Something went wrong");
          }
        } catch (err) {
          console.error("Logout failed:", err);
          toast.error("Failed: Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    }
  ];

  return (
    <div className={styles['profilecard-container-menu']}>
      <div className={styles["profile-image-dropdown"]}>
        <img className={styles['image-dropdown']} src="/profile.png" alt="profile" />
      </div>
      <hr className={styles["hr-underline-profile"]} />
      <div className={styles["profile-options-dropdown"]}>
        {options.map((item) => (
          <div key={item.label}>
            <div
              className={styles['profile-menu-item']}
              onClick={item.action}
              style={{ cursor: loading && item.label === "Logout" ? "not-allowed" : "pointer" }}
            >
              <span className={styles['profile-item-name']}>
                {loading && item.label === "Logout" ? "Logging out..." : item.label}
                <IoIosArrowForward />
              </span>
            </div>
            <hr className={styles["hr-underline-profile"]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCardDropDown;
