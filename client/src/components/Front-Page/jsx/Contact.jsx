import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/Contact.module.css';

const ContactUsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.contact}>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

const Contact = () => {
  return (
    <>
      <section id="contact" className={styles.contact_section}>
        <div className={styles.row}>
          {/* Large screen image */}
          <div className={styles.contact_img_box}>
            <img src="/contact.png" alt="Contact" />
          </div>

          <div className={styles.contact_form_wrapper}>
            <h2 className={styles.heading}>Contact Us</h2>

            {/* Small screen responsive image */}
            <div className={styles.responsiveImage}>
              <img src="/contact.png" alt="Contact" />
            </div>

            <form action="#" method="POST" className={styles.contact_form_container}>
              <input type="text" name="fullname" placeholder="Name" required className={styles.input} />
              <input type="email" name="ename" placeholder="Email" required className={styles.input} />
              <input type="tel" name="tnumber" placeholder="Phone Number" required className={styles.input} />
              <input type="text" name="message" placeholder="Message" required className={`${styles.input} ${styles.mt}`} />
              <button type="submit" name="subnum" value="SM" className={`${styles.submit_button} ${styles.mt}`}>
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUsPage;
export {Contact};
