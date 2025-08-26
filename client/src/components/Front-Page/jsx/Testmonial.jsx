import styles from '../css/Testmonial.module.css'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Learner',
    message: 'LearnToKnow helped me find the perfect teacher. The platform is easy to use and the support is fantastic!',
    image: 'profile.png',
  },
  {
    name: 'Arjun Mehta',
    role: 'Parent',
    message: 'My son’s grades have improved so much thanks to the amazing teachers here. Highly recommended!',
    image: 'profile.png',
  },
  {
    name: 'Dr. Neha Kapoor',
    role: 'Educator',
    message: 'As a teacher, I love how easy it is to connect with motivated students. The platform is truly empowering.',
    image: 'profile.png',
  },
  {
    name: 'Rahul Jain',
    role: 'Educator',
    message: 'Amazing experience! The user interface is so intuitive and clean. Kudos to the team!',
    image: 'profile.png',
  },
]

const Testmonial = () => {
  return (
    <section className={styles.testimonial_section}>
      <h2 className={styles.heading}>What People Say</h2>
      <div className={styles.slider}>
        <div className={styles.slide_track}>
          {[...testimonials, ...testimonials].map((item, index) => (
            <div className={styles.card} key={index}>
              <img src={item.image} alt={item.name} className={styles.avatar} />
              <p className={styles.message}>“{item.message}”</p>
              <h3 className={styles.name}>{item.name}</h3>
              <span className={styles.role}>{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testmonial
