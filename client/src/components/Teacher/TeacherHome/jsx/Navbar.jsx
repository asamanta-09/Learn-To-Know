import { useState } from 'react';
import ProfileCardDropDown from './ProfileCardDropDown';
import styles from '../css/Navbar.module.css'
import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";
import { IonIcon } from "@ionic/react";

const Navbar = () => {
  const [profileClicked, setProfileClicked] = useState(false);

  const profileclick = () => {
    let clickStatus = !profileClicked;
    setProfileClicked(clickStatus);
  }

  return (
    <>
      <header className={styles['navbar-header']}>
        <nav className={styles['navbar-items']}>
          <div className={styles['img-logo']}>
            <IonIcon name="logo-firebase" />
            <h2>LearnToKnow</h2>
          </div>
          <div className={styles['menu-search']}>
          </div>
          <div>
            <span className={styles['search-bar']}>
              <IoSearch />
              <input type="text" placeholder='Search here...' />
              <button>Search</button>
            </span>
          </div>
          <div className={styles['notification-profile']}>
            <span className={styles['message']}><FaWhatsapp /></span>
            <span className={styles['translate']}><SiGoogletranslate /></span>
            <span className={styles['notification-count']}>10+</span>
            <span className={styles['notification']}><CiBellOn /></span>
            <span className={styles['profile']}>
              <img className={styles['img-profile']} src="/profile.png" alt="not-found" onClick={profileclick} />
              <div className={styles["profile-menu"]}>
                {profileClicked && <ProfileCardDropDown />}
              </div>
            </span>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
