import Link from 'next/link';
import styles from './Intro.module.scss';

export default function Intro() {
  return (
    <section className={styles.intro} id="about">
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <h2 className={styles.greeting}>
            Hello, <br />
            I&rsquo;m JO HYUKRAE !
          </h2>
          <p className={styles.description}>
            I am a self-taught Graphic Designer based in Viet Nam with extensive marketing and
            communication experience. I am currently living in France and pursuing a degree in
            Digital Web & Project Management.
          </p>
          <Link href="https://linkedin.com/in/han-nnb" target="_blank" className={styles.ctaButton}>
            linkedin.com/in/han-nnb
          </Link>
        </div>

        {/* Right Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            {/* Circle Background */}
            <div className={styles.circleBg}></div>
            
            {/* Profile Image Placeholder */}
            <div className={styles.profileImagePlaceholder}>
               {/* <Image src="/path/to/image.jpg" alt="JO HYUKRAE" fill className={styles.profileImage} /> */}
            </div>

            {/* Contact Card Overlay */}
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Contact</h3>
              <ul className={styles.contactList}>
                <li>
                  <span className={styles.icon}>📍</span> Narbonne, France
                </li>
                <li>
                  <span className={styles.icon}>✉️</span> nnbh928@gmail.com
                </li>
                <li>
                  <span className={styles.icon}>📞</span> 07 82 84 59 00
                </li>
              </ul>
            </div>
            
            {/* Decorative Elements */}
            <div className={styles.dateBadge}>2nd August 1999</div>
            <div className={styles.nationalityBadge}>Vietnamese</div>
          </div>
        </div>
      </div>
    </section>
  );
}
