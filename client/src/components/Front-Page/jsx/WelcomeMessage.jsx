import styles from '../css/WelcomeMessage.module.css'

const WelcomeMessage = () => {
  return (
    <>
      <main className={styles.welcome}>
        <h1 className={styles.title}>Hello World! <br /><p>Welcome to LearnToKnow</p></h1>
        <p className={styles.subtitle}>
          Ready to start your learning journey? <br />
          Join thousands of students and teachers who trust <br />us to help them succeed — because your future deserves the best.
        </p>
        <a href="#student" className={styles.ctaButton}>Get Started</a>
      </main>
    </>
  )
}

export default WelcomeMessage
