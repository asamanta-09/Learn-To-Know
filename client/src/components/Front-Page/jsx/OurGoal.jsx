import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/OurGoal.module.css';

const OurGoalPage = () => {
  return (
    <>
      <Header />
      <div className={styles.ourgoal}>
        <OurGoal />
      </div>
      <Footer />
    </>
  );
};

const OurGoal = () => {
  return (
    <section id="ourgoal" className={styles.ourgoalCard}>
      <div className={styles.ourgoalContent}>
        <h2 className={styles.ourgoalTitle}>Our Goal</h2>

        {/* Responsive image (mobile only) */}
        <div className={styles.responsiveImage}>
          <img src="/ourgoal.png" alt="our goal" />
        </div>

        <div className={styles.ourgoalParagraph}>
          We believe that learning should be accessible, enjoyable, and effective. Our mission is to empower every student to reach their fullest potential through quality teaching. <br /><br />

          With innovative tools, secure communication, and a supportive community, we aim to bridge the gap between learners and educators worldwide.
        </div>
      </div>

      {/* Main image (desktop only) */}
      <div className={styles.ourgoalImage}>
        <img src="/ourgoal.png" alt="our goal" />
      </div>
    </section>
  );
};

export default OurGoalPage;
export { OurGoal };
