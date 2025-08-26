import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../css/Header.module.css'
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5'

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className={styles.home_header}>
        <Link to="/" className={styles.home_logo}>LearnToKnow</Link>

        {/* Hamburger Icon */}
        <div className={styles.home_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IoMenuOutline size={28} color="#fff" />
        </div>

        <nav className={styles.home_nav}>
          <Link to="/home">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/why-us">Why Us</Link>
          <Link to="/our-goal">Our Goal</Link>
          <Link to="/contact-us">Contact Us</Link>
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
  )
}

export default Header
