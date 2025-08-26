import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={styles["footer"]}>
        <h2>LearnToKnow</h2>
        <div className={styles["footer-items"]}>
          <div className={styles["footer-item"]}>
            <a href="faq">About Us</a>
            <a href="faq">Privacy Policy</a>
            <a href="faq">Our Services</a>
          </div>
          <div className={styles["footer-item"]}>
            <a href="faq">FAQs</a>
            <a href="faq">Help Center</a>
            <a href="faq">Terms of Use</a>
          </div>
          <div className={styles["footer-item"]}>
            <p>Phone: <a href="tel:xxxxxxxx">xxxxxxxxxx</a></p>
            <p>Email: <a href="mailto:learntoknow.co@gmail.com">learntoknow.co@gmail.com</a></p>
          </div>
        </div>
        <div className={styles["footer-office-address"]}>
          <p>Office Address: abc road, Kolkata-760007</p>
        </div>
        <div className={styles["line"]}></div>
        <div className={styles["container"]}>
          <div className={styles["social-container"]}>
            <div className={styles["social-box"]}>
              <a href="">
                <img src="/fb.png" alt="Facebook" title="Facebook" />
              </a>
              <a href="">
                <img src="/twitter.png" alt="Twitter" title="Twitter" />
              </a>
              <a href="">
                <img src="/linkedin.png" alt="LinkedIn" title="LinkedIn" />
              </a>
              <a href="https://www.instagram.com/bond_007_here/">
                <img src="/instagram.png" alt="Instagram" title="Instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["copyright"]}>
        Copyright &copy; 2025. All Rights Reserved by LearnToKnow
      </div>
    </footer>
  )
}

export default Footer
