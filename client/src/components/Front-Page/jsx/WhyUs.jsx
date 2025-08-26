import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/WhyUs.module.css';

const WhyUsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.whyus}>
        <WhyUs />
      </div>
      <Footer />
    </>
  );
};

const WhyUs = () => {
  return (
    <>
      <section id="whyus" className={styles.whyusCard}>
        {/* Default image for large screens */}
        <div className={styles.whyusImage}>
          <img src="/whyus.png" alt="Why choose us illustration" />
        </div>

        <div className={styles.whyusContent}>
          <h2 className={styles.whyusTitle}>Why Us</h2>

          {/* Responsive image for small screens */}
          <div className={styles.responsiveImage}>
            <img src="/whyus.png" alt="" aria-hidden="true" />
          </div>

          <div className={styles.whyusParagraph}>
            Our platform is dedicated to helping students find the perfect match for their learning needs. We carefully verify each teacher’s credentials to ensure quality education. <br /><br />

            Whether you want to improve your math skills, learn a new language, or explore creative arts, we have passionate educators ready to guide you. <br /><br />

            Enjoy personalized one-on-one sessions tailored to your style and pace — because your education should be as unique as you are.
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUsPage;
export { WhyUs };
