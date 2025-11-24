import { Link } from "@tanstack/react-router"
import styles from "./NavBar.module.css"

const menu = [
  { label: "Docs", path: "https://strat-web-app.pages.dev/vault" },
  { label: "Twitter", path: "https://initia.xyz/" },
  { label: "Get iUSD", path: "https://strat-web-app.pages.dev/" },
]

export function NavBar() {
  // const [isOpen, setIsOpen] = useState(false)

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/iusd_logo.webp" alt="Strat Logo" className={styles.logo} />
        <nav className={styles.menu}>
          {menu
            .filter((item) => item.label !== "Launch App")
            .map((item) => (
              <Link key={item.label} to={item.path} className={styles.link}>
                {item.label}
              </Link>
            ))}
        </nav>

        {/* <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button> */}
      </div>
      {/* 
      {isOpen && (
        <div className={styles.mobileMenu}>
          <nav>
            {menu.map((item) => (
              <div key={item.path} className={styles.mobileNavItem}>
                <img src="/arrow-up-right.svg" alt="arrow" />
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileLink}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
          <div className={styles.mobileSocials}>
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialLinks}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}
