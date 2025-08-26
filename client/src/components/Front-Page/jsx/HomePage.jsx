import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { IonIcon } from "@ionic/react";
import {logoFirebase } from 'ionicons/icons';

import WelcomeMessage from './WelcomeMessage';
import StudentPart from './StudentPart';
import TeacherPart from './TeacherPart';
import { AboutUs } from './AboutUs';
import { WhyUs } from './WhyUs';
import { OurGoal } from './OurGoal';
import Testmonial from './Testmonial';
import { Contact } from './Contact';
import Footer from '../../Utility-all/Footer';
import Review from './Review';

import styles from '../css/HomePage.module.css';

const HomePage = () => {
  return (
    <div id="home" className={styles.body}>
      <NavMenu />
      <WelcomeMessage />
      <StudentPart />
      <TeacherPart />
      <AboutUs />
      <WhyUs />
      <OurGoal />
      <Testmonial />
      <Contact />
      <Review />
      <Footer />
    </div>
  );
};

const NavMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className={styles.home_header}>
        <Link to="/" className={styles.home_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.home_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IoMenuOutline size={28} color="#fff" />
        </div>

        <nav className={styles.home_nav}>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#whyus">Why Us</a>
          <a href="#ourgoal">Our Goal</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.close_btn} onClick={() => setSidebarOpen(false)}>
          <IoCloseOutline size={28} />
        </div>
        <Link to="/home" onClick={() => setSidebarOpen(false)}>Home</Link>
        <Link to="/about-us" onClick={() => setSidebarOpen(false)}>About Us</Link>
        <Link to="/why-us" onClick={() => setSidebarOpen(false)}>Why Us</Link>
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our Goal</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
      </div>
    </>
  );
};

export default HomePage;
