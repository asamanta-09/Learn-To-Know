import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../css/ProfileCardDropDown.module.css';
import { IoIosArrowForward } from "react-icons/io";
import  protectedApi  from '../../../../api/protectedApi.js';

const ProfileCardDropDown = () => {
  const navigate = useNavigate();
  const options = [
    { label: "View Profile", action: () => navigate('/profile') },
    { label: "Edit Profile", action: () => navigate('/edit-profile') },
    { label: "Settings and Privacy", action: () => navigate('/settings') },
    {
      label: "Logout", action: async () => {
        try {
          const response = await protectedApi.post("/student/logout", {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.data?.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            toast.success(response.data?.message || "Logged Out Successfully"); 
            navigate("/students/login");
          }
          else{
            toast.error(response.data?.message);
          }
        } catch (err) {
          console.error("Logout failed:", err);
          toast.error("Something went wrong");
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
              style={{ cursor: "pointer" }}
            >
              <span className={styles['profile-item-name']}>
                {item.label}
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
