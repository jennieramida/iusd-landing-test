import gsap from "gsap"
import { useLenis } from "lenis/react"
import { useEffect, useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { createFileRoute } from "@tanstack/react-router"
import styles from "./index.module.css"

import { NavBar } from "~/components/NavBar"

export const Route = createFileRoute("/")({
  component: Home,
})

// Helper functions
const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max)

const mapRange = (inMin: number, inMax: number, value: number, outMin: number, outMax: number) => {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin)
}

const TokenPattern = () => {
  return (
    <div className={styles.tokenWrapper}>
      <div className={styles.patternLeft}>
        {[...Array(5)].map((_, i) => (
          <img key={i} src="/iusd_line.webp" alt="" className={styles.tokenLine} />
        ))}
      </div>

      <img src="/iusd_solid.webp" alt="Strat Logo" className={styles.tokenSolid} />

      <div className={styles.patternRight}>
        {[...Array(5)].map((_, i) => (
          <img key={i} src="/iusd_line.webp" alt="" className={styles.tokenLine} />
        ))}
      </div>
    </div>
  )
}

function Home() {
  // Scene 1 + 2
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navBarRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const tokenWrapperTopRef = useRef<HTMLDivElement>(null)
  const tokenWrapperBottomRef = useRef<HTMLDivElement>(null)
  const iusdTextRef = useRef<HTMLDivElement>(null)
  // Scene 3 + 4
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Scene 5
  const contentSectionRef = useRef<HTMLDivElement>(null)

  // Scene 6
  const pathRef = useRef<SVGPathElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const animationPlayed = useRef(false)
  const { height: windowHeight = 0, width: windowWidth = 0 } = useWindowSize()

  useLenis(
    ({ scroll }) => {
      if (scroll < 10) return

      // Set scenes
      const scrollStart = 0
      const scrollEnd = 1.5 * windowHeight
      const progress = clamp(0, mapRange(scrollStart, scrollEnd, scroll, 0, 1), 1)

      const delayAmount = 0.25 * windowHeight
      const scrollPhase2Start = scrollEnd + delayAmount
      const scrollPhase2End = scrollPhase2Start + 0.75 * windowHeight
      const progress2 = clamp(0, mapRange(scrollPhase2Start, scrollPhase2End, scroll, 0, 1), 1)

      const scrollPhase3Start = scrollPhase2End
      const scrollPhase3End = scrollPhase3Start + 0.5 * windowHeight
      const progress3 = clamp(0, mapRange(scrollPhase3Start, scrollPhase3End, scroll, 0, 1), 1)

      const scrollPhase4Start = scrollPhase3End
      const scrollPhase4End = scrollPhase4Start + windowHeight
      const progress4 = clamp(0, mapRange(scrollPhase4Start, scrollPhase4End, scroll, 0, 1), 1)

      const scrollPhase5Start = scrollPhase4End
      const scrollPhase5End = scrollPhase5Start + windowHeight
      const progress5 = clamp(0, mapRange(scrollPhase5Start, scrollPhase5End, scroll, 0, 1), 1)

      const scrollPhase6Start = scrollPhase5End
      const scrollPhase6End = scrollPhase6Start + windowHeight // Make it longer for the circle animation
      const progress6 = clamp(0, mapRange(scrollPhase6Start, scrollPhase6End, scroll, 0, 1), 1)

      // iUSD scene 1 + 2
      if (iusdTextRef.current) {
        const delayThreshold = 0.3
        const opacity = progress < delayThreshold ? 0 : mapRange(delayThreshold, 1, progress, 0, 1)

        const yOffset = -progress * 50 - progress2 * 170 - progress3 * 180 - progress5 * 300 // Move up 100px in phase 2
        const scale = 1 + progress2 * 0.5

        gsap.to(iusdTextRef.current, {
          opacity: clamp(0, opacity, 1),
          y: yOffset,
          scale,
          duration: 0.1,
          ease: "none",
        })
      }

      // Title
      if (titleRef.current) {
        const scale = 1 - progress * 0.3 - progress2 * 0.2
        gsap.to(titleRef.current, {
          scale,
          duration: 0.1,
          ease: "none",
        })
      }

      if (titleContainerRef.current) {
        const yOffset = -progress * -40 - progress2 * 170 - progress3 * 160 - progress5 * 300
        gsap.to(titleContainerRef.current, {
          y: yOffset,
          duration: 0.1,
          ease: "none",
        })
      }

      // Token

      const overlap = -48 - progress * 120

      const updateOverlapForWrapper = (wrapper: HTMLDivElement | null) => {
        if (!wrapper) return

        const leftTokens = wrapper.querySelectorAll(`.${styles.patternLeft} .${styles.tokenLine}`)
        const rightTokens = wrapper.querySelectorAll(`.${styles.patternRight} .${styles.tokenLine}`)

        // Left side: adjust margin-right so it moves toward center
        if (leftTokens.length) {
          gsap.to(leftTokens, {
            marginRight: `${overlap}px`,
            duration: 0.1,
            ease: "none",
          })

          // Fade each left token AFTER it overlaps with center
          leftTokens.forEach((token, index) => {
            // For left side: index 4 is closest to center, index 0 is furthest
            // So closest (4) should fade first
            const fadeStart = 0.5 + (4 - index) * 0.1
            const fadeEnd = fadeStart + 0.2

            let opacity = 1

            // Furthest left token (index 0) fades to 40% as scroll progresses
            if (index === 0) {
              const baseOpacity = 1 - progress * 0.6 // 1 -> 0.4
              opacity = baseOpacity
            }

            // Then apply the overlap fade (overrides if progress is past fadeStart)
            if (progress > fadeStart) {
              opacity = 1 - clamp(0, mapRange(fadeStart, fadeEnd, progress, 0, 1), 1)
            }

            if (progress >= 0.95) {
              opacity = 0
            }

            gsap.to(token, {
              opacity,
              duration: 0.1,
              ease: "none",
            })
          })
        }

        // Right side: adjust margin-left so it moves toward center
        if (rightTokens.length) {
          gsap.to(rightTokens, {
            marginLeft: `${overlap}px`,
            duration: 0.1,
            ease: "none",
          })

          // Fade each right token AFTER it overlaps with center
          rightTokens.forEach((token, index) => {
            // For right side: index 0 is closest to center, index 4 is furthest
            // So closest (0) should fade first
            const fadeStart = 0.5 + index * 0.1
            const fadeEnd = fadeStart + 0.2

            let opacity = 1

            // Furthest right token (index 4) fades to 40% as scroll progresses
            if (index === 4) {
              const baseOpacity = 1 - progress * 0.6 // 1 -> 0.4
              opacity = baseOpacity
            }

            // Then apply the overlap fade (overrides if progress is past fadeStart)
            if (progress > fadeStart) {
              opacity = 1 - clamp(0, mapRange(fadeStart, fadeEnd, progress, 0, 1), 1)
            }

            if (progress >= 0.95) {
              opacity = 0
            }

            gsap.to(token, {
              opacity,
              duration: 0.1,
              ease: "none",
            })
          })
        }
      }

      updateOverlapForWrapper(tokenWrapperTopRef.current)
      updateOverlapForWrapper(tokenWrapperBottomRef.current)

      const patternMargin = -48 - progress * 80

      const updatePatternWrapper = (wrapper: HTMLDivElement | null) => {
        if (!wrapper) return

        const patternLeft = wrapper.querySelector(`.${styles.patternLeft}`)
        const patternRight = wrapper.querySelector(`.${styles.patternRight}`)

        if (patternLeft) {
          gsap.to(patternLeft, {
            marginRight: `${patternMargin}px`,
            duration: 0.1,
            ease: "none",
          })
        }

        if (patternRight) {
          gsap.to(patternRight, {
            marginLeft: `${patternMargin}px`,
            duration: 0.1,
            ease: "none",
          })
        }
      }

      updatePatternWrapper(tokenWrapperTopRef.current)
      updatePatternWrapper(tokenWrapperBottomRef.current)

      if (tokenWrapperTopRef.current) {
        const yOffset = -progress2 * 170 // Move up same as title
        const opacity = 1 - progress2 // Fade to 0

        gsap.to(tokenWrapperTopRef.current, {
          y: yOffset,
          opacity,
          duration: 0.1,
          ease: "none",
        })
      }

      if (tokenWrapperBottomRef.current) {
        const yOffset = -progress2 * 170
        const scale = 1 + progress2 * 0.5

        gsap.to(tokenWrapperBottomRef.current, {
          y: yOffset,
          scale,
          duration: 0.1,
          ease: "none",
        })

        const solidToken = tokenWrapperBottomRef.current.querySelector(`.${styles.tokenSolid}`)
        if (solidToken) {
          const borderWidth = progress2 * 1
          const padding = progress2 * 16

          gsap.set(solidToken, {
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
            borderColor: "#000",
            borderRadius: "50%",
            padding: `${padding}px`,
            boxSizing: "border-box",
          })
        }
      }

      if (tokenWrapperBottomRef.current) {
        gsap.to(tokenWrapperBottomRef.current, {
          y: -progress2 * 170 - progress3 * 200,
          duration: 0.1,
          ease: "none",
        })
      }

      // Divider
      if (lineTopRef.current && lineBottomRef.current) {
        const lineEnd = 0.3
        const lineProgress = progress4 < lineEnd ? mapRange(0, lineEnd, progress4, 0, 1) : 1

        const width = lineProgress * 98
        const opacity = progress4 > 0 ? 1 : 0

        gsap.to([lineTopRef.current, lineBottomRef.current], {
          width: `${width}vw`,
          opacity,
          duration: 0.1,
          ease: "none",
        })
      }

      if (tokenWrapperBottomRef.current) {
        const fadeStart = 0.1
        const tokenOpacity =
          progress4 < fadeStart
            ? 1
            : 1 - clamp(0, mapRange(fadeStart, fadeStart + 0.2, progress4, 0, 1), 1)

        gsap.to(tokenWrapperBottomRef.current, {
          opacity: tokenOpacity,
          duration: 0.1,
          ease: "none",
        })
      }

      // Video control
      if (videoRef.current) {
        const video = videoRef.current

        const opacity = progress4 > 0 ? 1 : 0

        gsap.set(video, {
          opacity,
          y: -progress5 * 300,
        })

        if (video.duration) {
          const targetTime = progress4 * video.duration
          video.currentTime = targetTime
        }

        if (!video.paused) {
          video.pause()
        }
      }

      // CTA
      if (ctaRef.current) {
        const ctaStart = 0.3
        const ctaProgress = progress4 < ctaStart ? 0 : mapRange(ctaStart, 1, progress4, 0, 1)

        const ctaOpacity = ctaProgress
        const ctaY = (1 - ctaProgress) * 100 - progress5 * 300 - progress6 * 500

        gsap.to(ctaRef.current, {
          opacity: ctaOpacity,
          y: ctaY,
          duration: 0.1,
          ease: "none",
        })
      }

      // --- Phase 5/6: Animate circle along path ---
      // --- Phase 5/6: Animate circle along path (without MotionPathPlugin) ---
      if (circleRef.current && pathRef.current) {
        const pathProgress = progress5
        const pathLength = pathRef.current.getTotalLength()
        const point = pathRef.current.getPointAtLength(pathProgress * pathLength)

        gsap.set(circleRef.current, {
          x: point.x,
          y: point.y,
          xPercent: -50,
          yPercent: -50,
        })
      }
    },
    [windowHeight, windowWidth],
  )

  useEffect(() => {
    if (animationPlayed.current) return

    const timeline = gsap.timeline({ delay: 0.5 })

    timeline.fromTo(
      navBarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8",
    )

    timeline.fromTo(
      titleContainerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6",
    )

    animationPlayed.current = true

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <div ref={navBarRef} className={styles.navBarWrapper}>
        <NavBar />
      </div>
      <div className={styles.content} ref={contentRef}>
        {/* Top pattern */}
        <div ref={tokenWrapperTopRef}>
          <TokenPattern />
        </div>

        {/* iUSD text that fades in */}
        <div className={styles.iusdText} ref={iusdTextRef} style={{ opacity: 0 }}>
          iUSD
        </div>

        <div ref={titleContainerRef} className={styles.titleWrapper}>
          <div ref={lineTopRef} className={styles.divider} />
          <div className={styles.title} ref={titleRef}>
            The Stablecoin That <br />
            Fuels Initia&apos;s Economy
          </div>
          <div ref={lineBottomRef} className={styles.divider} />
        </div>
        {/* Bottom pattern */}
        <div ref={tokenWrapperBottomRef}>
          <TokenPattern />
        </div>
      </div>
      <div className={styles.videoSection}>
        <video
          ref={videoRef}
          src="/iusd.mp4"
          muted
          playsInline
          preload="auto"
          className={styles.video}
        />
      </div>
      <div ref={ctaRef} className={styles.ctaWrapper}>
        <div className={styles.cta}>GET iUSD NOW</div>
        <div ref={contentSectionRef} className={styles.contentSection}>
          <div className={styles.featureSection}>
            <div className={styles.featureContentLeft}>
              <h2>Instant Liquidity</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea{" "}
              </p>
            </div>

            <svg
              className={styles.pathSvg}
              viewBox="0 0 1634 1431"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={pathRef}
                d="M1027.57 0C1225.13 0 1385.28 160.152 1385.28 357.71C1385.28 555.268 1225.13 715.42 1027.57 715.42H354.042C158.727 717.391 1 876.619 1 1072.4C1.00026 1269.41 160.705 1429.4 357.71 1429.4H1633.5V1430.4H357.71C160.152 1430.4 0.000264031 1269.96 0 1072.4C0 879.984 151.925 722.777 342.364 714.725V714.42H354.091C355.296 714.408 356.502 714.4 357.71 714.4H1030V714.411C1225.89 713.103 1384.28 553.904 1384.28 357.71C1384.28 160.704 1224.57 1 1027.57 1H1019.5V0H1027.57Z"
                stroke="#666"
                strokeWidth="1"
                fill="none"
              />
            </svg>

            {/* <div ref={circleRef} className={styles.pathCircle} /> */}

            <div className={styles.featureContentRight}>
              <h2>Powering Finance Together</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
