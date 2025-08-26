import { useState } from 'react';
import { IonIcon } from "@ionic/react";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import ProfileCardDropDown from './ProfileCardDropDown';
import styles from '../css/Navbar.module.css'
import { CiBellOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { SiGoogletranslate } from "react-icons/si";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Navbar = () => {

  //just dummy data - need to fatch from backend
  const coursemenuItem = {
    option1: {
      name: "Newly Launched",
      subItem: {
        "sub-op-1": "Software Engineering",
        "sub-op-2": "GATE CSE preparation",
        "sub-op-3": "React JS",
      }
    },
    option2: {
      name: "Popular Courses",
      subItem: {
        "sub-op-1": "Data Structure and algorithm",
        "sub-op-2": "Java programming",
        "sub-op-3": "Software Engineering",
        "sub-op-4": "React JS",
        "sub-op-5": "Cloud Computing"
      }
    },
    option3: {
      name: "All Courses",
      subItem: {
        "sub-op-1": "Data Structure and algorithm",
        "sub-op-2": "Java programming",
        "sub-op-3": "Software Engineering",
        "sub-op-4": "Artificial Neural Network",
        "sub-op-5": "Operating System",
        "sub-op-6": "C++ Programming",
        "sub-op-7": "Software Engineering",
        "sub-op-8": "GATE CSE preparation",
        "sub-op-9": "React JS",
        "sub-op-10": "Cloud Computing",
      }
    },
    option4: {
      name: "Interview Preparation",
    },
    option5: {
      name: "Exam Preparation",
    },
  }

  const notesmenuItem = {
    option1: {
      name: "Data Structure and algorithm"
    },
    option2: {
      name: "Java programming"
    },
    option3: {
      name: "Software Engineering"
    },
    option4: {
      name: "Artificial Neural Network"
    },
    option5: {
      name: "Operating System"
    },
  }

  const [courseDropDown, setCourseDropdown] = useState(false);
  const [notesDropDown, setNotesDropdown] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);

  const onMouseEnter = (e) => {
    setCourseDropdown(true);
  }
  const onMouseLeave = () => {
    setCourseDropdown(false);
  }

  const onMouse = (e) => {
    setNotesDropdown(true);
  }
  const onLeave = () => {
    setNotesDropdown(false);
  }

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
            <span className={styles['menu-items']}>
              <ul>
                <li className={styles['inside-li']}><Link className={styles['link']} to="/">Home</Link></li>
                <li className={styles['inside-li']}>
                  <div className={styles['course']} onMouseEnter={(e) => { onMouseEnter(e) }} onMouseLeave={onMouseLeave} >
                    <span>Courses</span> &nbsp;
                    {courseDropDown ? <FaChevronUp /> : <FaChevronDown />}
                    <div className={styles["course-menu"]}>
                      {courseDropDown && <DropdownMenu menuItem={coursemenuItem} />}
                    </div>
                  </div>
                </li>
                <li className={styles['inside-li']}>
                  <div className={styles['notes']} onMouseEnter={onMouse} onMouseLeave={onLeave} >
                    <span>Notes</span> &nbsp;
                    {notesDropDown ? <FaChevronUp /> : <FaChevronDown />}
                    <div className={styles["notes-menu"]}>
                      {notesDropDown && <DropdownMenu menuItem={notesmenuItem} />}
                    </div>
                  </div>
                </li>
              </ul>
            </span>
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
