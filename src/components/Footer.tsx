import styles from "./Footer.module.css"

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerUpper}>
        <div className={styles.tagline}>The Stablecoin That Fuels Initia’s Economy</div>
        <div className={styles.linkWrapper}>
          <div className={styles.linkRow}>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>initia.xyz</div>
            </div>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>Ecosystem</div>
            </div>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>Docs</div>
            </div>
          </div>
          <div className={styles.linkRow}>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>Blog</div>
            </div>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>Initia X</div>
            </div>
            <div className={styles.link}>
              <div className={styles.bullet} />
              <div className={styles.linkLabel}>Telegram</div>
            </div>
          </div>
        </div>
      </div>
      <img src="/footer.png" alt="Init Logo" className={styles.footerImage} />
    </div>
  )
}
