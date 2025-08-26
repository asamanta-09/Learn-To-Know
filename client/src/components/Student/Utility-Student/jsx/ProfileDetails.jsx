import styles from '../css/ProfileDetails.module.css'
import { ImLinkedin2 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaHandPointRight, FaEnvelopeOpenText } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { authApi } from '../../../../api/authApi.js';


const ProfileDetails = () => {
  const [profile, setProfile] = useState({});
  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) return;
    authApi
      .get("/student/getProfileInfo", {
        params: { email },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfile(response.data.student);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

  return (
    <div className={styles['hero-section']}>
      <div className={styles['photo-name']}>
        <div className={styles["profile-photo"]}>
          <img className={styles["profile-image"]} src="/profile.png" alt="" />
        </div>
        <div className={styles["name-section"]}>{profile.name}</div><hr className={styles['hr-line']} />
      </div>
      {/* <div className={styles['about-section']}>
        <div><FaEnvelopeOpenText className={styles['about']} /></div>&nbsp;&nbsp;
        <p>Hello i am a computer science student and i am here to learn and expore the world in a incredible way of learing</p>
      </div> */}
      <div className={styles['see-more']}><a href="/"><FaHandPointRight className={styles['about']} />&nbsp;&nbsp;See more details..</a></div><hr className={styles['hr-line']} />
      <div className={styles["contact-details"]}>
        <div className={styles["phone"]}> Phone : {profile.phone_no}</div>
        <div className={styles["email"]}>E-mail : {profile.email}</div>
      </div><hr className={styles['hr-line']} />
      <div className={styles["social-media"]}>
        <div className={styles['instagram']}><BsInstagram /></div>
        <div className={styles['linkedin']}><ImLinkedin2 /> </div>
        <div className={styles['twitter']}><BsTwitterX /></div>
        <div className={styles['facebook']}><FaFacebook /></div>
      </div>
    </div>
  )
}

export default ProfileDetails
