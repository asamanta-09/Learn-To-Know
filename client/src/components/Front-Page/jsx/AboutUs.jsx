import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/AboutUs.module.css';

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.about}>
        <AboutUs />
      </div>
      <Footer />
    </>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className={styles.aboutCard}>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutusTitle}>About Us</h2>

        {/* Responsive image (visible only on small screens) */}
        <div className={styles.responsiveImage}>
          <img src="/about.png" alt="about us" />
        </div>

        <div className={styles.aboutusParagraph}>
          We are a dedicated team of education enthusiasts who understand the importance of finding the right teacher for every student. Our mission is to make it easy for students and parents to find experienced, knowledgeable, and passionate teachers who can help them achieve their academic goals.
          <br /><br />
          We believe that learning should be engaging, interactive, and enjoyable, and that the best way to achieve this is through personalized one-on-one instruction. Our platform allows students to connect with teachers who can tailor their lessons to their unique learning styles, needs, and preferences.
        </div>
      </div>

      {/* Main image (visible only on large screens) */}
      <div className={styles.aboutImage}>
        <img src="/about.png" alt="about us" />
      </div>
    </section>
  );
};

export default AboutUsPage;
export { AboutUs };
