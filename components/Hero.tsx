import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Text */}
      <div className={styles.bgTextWrapper}>
        <div className={styles.bgTextRow}>PORTFOLIO</div>
        <div className={styles.bgTextRow}>PORTFOLIO</div>
        <div className={styles.bgTextRow}>PORTFOLIO</div>
      </div>

      <div className={styles.container}>
        {/* Left Content: Image with Orange Square */}
        <div className={styles.imageSection}>
           <div className={styles.orangeSquare}></div>
           <div className={styles.profileImagePlaceholder}>
             {/* Image goes here */}
           </div>
           
           {/* Decorative Stars */}
           <div className={styles.star1}>✦</div>
           <div className={styles.star2}>✦</div>
        </div>
        
        {/* Right Content: Text Info */}
        <div className={styles.infoSection}>
           <div className={styles.infoItem}>BE: /hannnb</div>
           <div className={styles.infoItem}>IG: @han.nnb</div>
           <div className={styles.infoItem}>LI: /han-nnb</div>
        </div>
      </div>
      
      {/* Bottom Description */}
      <div className={styles.bottomDesc}>
        I love design and anything related to art.
        I approach problems in a rational and pragmatic way and seek the simplest and most functional solutions possible.
      </div>

      <a href="#about" className={styles.scrollIndicator}>
        Scroll down
      </a>
      <div className={styles.band} />
    </section>
  );
}
