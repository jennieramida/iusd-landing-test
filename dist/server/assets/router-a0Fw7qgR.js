import { jsxs, jsx } from "react/jsx-runtime";
import { QueryClient } from "@tanstack/react-query";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";
function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
function Lenis({ children }) {
  return /* @__PURE__ */ jsx(ReactLenis, { root: true, children });
}
const fontsCss = "/assets/fonts-kNciGbpp.css";
const globalCss = "/assets/globals-Bt_ylZim.css";
const resetCss = "/assets/reset-D-KsivSJ.css";
const variableCss = "/assets/variables-XtHgqsVg.css";
const seo = ({
  title: title2,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title: title2 },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title2 },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title2 },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "iUSD Landing Page",
        description: ``
      })
    ],
    links: [
      { rel: "stylesheet", href: fontsCss },
      { rel: "stylesheet", href: variableCss },
      { rel: "stylesheet", href: globalCss },
      { rel: "stylesheet", href: resetCss },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Lenis, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const container$1 = "_container_1gm6f_1";
const navBarWrapper = "_navBarWrapper_1gm6f_14";
const content = "_content_1gm6f_21";
const tokenWrapper = "_tokenWrapper_1gm6f_36";
const patternLeft = "_patternLeft_1gm6f_47";
const patternRight = "_patternRight_1gm6f_48";
const tokenSolid = "_tokenSolid_1gm6f_62";
const tokenLine = "_tokenLine_1gm6f_75";
const iusdText = "_iusdText_1gm6f_99";
const titleWrapper = "_titleWrapper_1gm6f_114";
const title = "_title_1gm6f_114";
const divider = "_divider_1gm6f_131";
const videoSection = "_videoSection_1gm6f_151";
const video = "_video_1gm6f_151";
const ctaWrapper = "_ctaWrapper_1gm6f_169";
const cta = "_cta_1gm6f_169";
const contentSection = "_contentSection_1gm6f_207";
const featureSection = "_featureSection_1gm6f_219";
const featureContentLeft = "_featureContentLeft_1gm6f_227";
const featureContentRight = "_featureContentRight_1gm6f_228";
const pathSvg = "_pathSvg_1gm6f_250";
const styles$1 = {
  container: container$1,
  navBarWrapper,
  content,
  tokenWrapper,
  patternLeft,
  patternRight,
  tokenSolid,
  tokenLine,
  iusdText,
  titleWrapper,
  title,
  divider,
  videoSection,
  video,
  ctaWrapper,
  cta,
  contentSection,
  featureSection,
  featureContentLeft,
  featureContentRight,
  pathSvg
};
const container = "_container_2u9kb_1";
const wrapper = "_wrapper_2u9kb_10";
const logo = "_logo_2u9kb_24";
const menu$1 = "_menu_2u9kb_34";
const link = "_link_2u9kb_42";
const styles = {
  container,
  wrapper,
  logo,
  menu: menu$1,
  link
};
const menu = [
  { label: "Docs", path: "https://strat-web-app.pages.dev/vault" },
  { label: "Twitter", path: "https://initia.xyz/" },
  { label: "Get iUSD", path: "https://strat-web-app.pages.dev/" }
];
function NavBar() {
  return /* @__PURE__ */ jsx("div", { className: styles.container, children: /* @__PURE__ */ jsxs("div", { className: styles.wrapper, children: [
    /* @__PURE__ */ jsx("img", { src: "/iusd_logo.webp", alt: "Strat Logo", className: styles.logo }),
    /* @__PURE__ */ jsx("nav", { className: styles.menu, children: menu.filter((item) => item.label !== "Launch App").map((item) => /* @__PURE__ */ jsx(Link, { to: item.path, className: styles.link, children: item.label }, item.label)) })
  ] }) });
}
const Route = createFileRoute("/")({
  component: Home
});
const clamp = (min, value, max) => Math.min(Math.max(value, min), max);
const mapRange = (inMin, inMax, value, outMin, outMax) => {
  return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
};
const TokenPattern = () => {
  return /* @__PURE__ */ jsxs("div", { className: styles$1.tokenWrapper, children: [
    /* @__PURE__ */ jsx("div", { className: styles$1.patternLeft, children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("img", { src: "/iusd_line.webp", alt: "", className: styles$1.tokenLine }, i)) }),
    /* @__PURE__ */ jsx("img", { src: "/iusd_solid.webp", alt: "Strat Logo", className: styles$1.tokenSolid }),
    /* @__PURE__ */ jsx("div", { className: styles$1.patternRight, children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("img", { src: "/iusd_line.webp", alt: "", className: styles$1.tokenLine }, i)) })
  ] });
};
function Home() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const navBarRef = useRef(null);
  const titleRef = useRef(null);
  const tokenWrapperTopRef = useRef(null);
  const tokenWrapperBottomRef = useRef(null);
  const iusdTextRef = useRef(null);
  const titleContainerRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);
  const contentSectionRef = useRef(null);
  const pathRef = useRef(null);
  const circleRef = useRef(null);
  const animationPlayed = useRef(false);
  const { height: windowHeight = 0, width: windowWidth = 0 } = useWindowSize();
  useLenis(
    ({ scroll }) => {
      if (scroll < 10) return;
      const scrollStart = 0;
      const scrollEnd = 1.5 * windowHeight;
      const progress = clamp(0, mapRange(scrollStart, scrollEnd, scroll, 0, 1), 1);
      const delayAmount = 0.25 * windowHeight;
      const scrollPhase2Start = scrollEnd + delayAmount;
      const scrollPhase2End = scrollPhase2Start + 0.75 * windowHeight;
      const progress2 = clamp(0, mapRange(scrollPhase2Start, scrollPhase2End, scroll, 0, 1), 1);
      const scrollPhase3Start = scrollPhase2End;
      const scrollPhase3End = scrollPhase3Start + 0.5 * windowHeight;
      const progress3 = clamp(0, mapRange(scrollPhase3Start, scrollPhase3End, scroll, 0, 1), 1);
      const scrollPhase4Start = scrollPhase3End;
      const scrollPhase4End = scrollPhase4Start + windowHeight;
      const progress4 = clamp(0, mapRange(scrollPhase4Start, scrollPhase4End, scroll, 0, 1), 1);
      const scrollPhase5Start = scrollPhase4End;
      const scrollPhase5End = scrollPhase5Start + windowHeight;
      const progress5 = clamp(0, mapRange(scrollPhase5Start, scrollPhase5End, scroll, 0, 1), 1);
      const scrollPhase6Start = scrollPhase5End;
      const scrollPhase6End = scrollPhase6Start + windowHeight;
      const progress6 = clamp(0, mapRange(scrollPhase6Start, scrollPhase6End, scroll, 0, 1), 1);
      if (iusdTextRef.current) {
        const delayThreshold = 0.3;
        const opacity = progress < delayThreshold ? 0 : mapRange(delayThreshold, 1, progress, 0, 1);
        const yOffset = -progress * 50 - progress2 * 170 - progress3 * 180 - progress5 * 300;
        const scale = 1 + progress2 * 0.5;
        gsap.to(iusdTextRef.current, {
          opacity: clamp(0, opacity, 1),
          y: yOffset,
          scale,
          duration: 0.1,
          ease: "none"
        });
      }
      if (titleRef.current) {
        const scale = 1 - progress * 0.3 - progress2 * 0.2;
        gsap.to(titleRef.current, {
          scale,
          duration: 0.1,
          ease: "none"
        });
      }
      if (titleContainerRef.current) {
        const yOffset = -progress * -40 - progress2 * 170 - progress3 * 160 - progress5 * 300;
        gsap.to(titleContainerRef.current, {
          y: yOffset,
          duration: 0.1,
          ease: "none"
        });
      }
      const overlap = -48 - progress * 120;
      const updateOverlapForWrapper = (wrapper2) => {
        if (!wrapper2) return;
        const leftTokens = wrapper2.querySelectorAll(`.${styles$1.patternLeft} .${styles$1.tokenLine}`);
        const rightTokens = wrapper2.querySelectorAll(`.${styles$1.patternRight} .${styles$1.tokenLine}`);
        if (leftTokens.length) {
          gsap.to(leftTokens, {
            marginRight: `${overlap}px`,
            duration: 0.1,
            ease: "none"
          });
          leftTokens.forEach((token, index) => {
            const fadeStart = 0.5 + (4 - index) * 0.1;
            const fadeEnd = fadeStart + 0.2;
            let opacity = 1;
            if (index === 0) {
              const baseOpacity = 1 - progress * 0.6;
              opacity = baseOpacity;
            }
            if (progress > fadeStart) {
              opacity = 1 - clamp(0, mapRange(fadeStart, fadeEnd, progress, 0, 1), 1);
            }
            if (progress >= 0.95) {
              opacity = 0;
            }
            gsap.to(token, {
              opacity,
              duration: 0.1,
              ease: "none"
            });
          });
        }
        if (rightTokens.length) {
          gsap.to(rightTokens, {
            marginLeft: `${overlap}px`,
            duration: 0.1,
            ease: "none"
          });
          rightTokens.forEach((token, index) => {
            const fadeStart = 0.5 + index * 0.1;
            const fadeEnd = fadeStart + 0.2;
            let opacity = 1;
            if (index === 4) {
              const baseOpacity = 1 - progress * 0.6;
              opacity = baseOpacity;
            }
            if (progress > fadeStart) {
              opacity = 1 - clamp(0, mapRange(fadeStart, fadeEnd, progress, 0, 1), 1);
            }
            if (progress >= 0.95) {
              opacity = 0;
            }
            gsap.to(token, {
              opacity,
              duration: 0.1,
              ease: "none"
            });
          });
        }
      };
      updateOverlapForWrapper(tokenWrapperTopRef.current);
      updateOverlapForWrapper(tokenWrapperBottomRef.current);
      const patternMargin = -48 - progress * 80;
      const updatePatternWrapper = (wrapper2) => {
        if (!wrapper2) return;
        const patternLeft2 = wrapper2.querySelector(`.${styles$1.patternLeft}`);
        const patternRight2 = wrapper2.querySelector(`.${styles$1.patternRight}`);
        if (patternLeft2) {
          gsap.to(patternLeft2, {
            marginRight: `${patternMargin}px`,
            duration: 0.1,
            ease: "none"
          });
        }
        if (patternRight2) {
          gsap.to(patternRight2, {
            marginLeft: `${patternMargin}px`,
            duration: 0.1,
            ease: "none"
          });
        }
      };
      updatePatternWrapper(tokenWrapperTopRef.current);
      updatePatternWrapper(tokenWrapperBottomRef.current);
      if (tokenWrapperTopRef.current) {
        const yOffset = -progress2 * 170;
        const opacity = 1 - progress2;
        gsap.to(tokenWrapperTopRef.current, {
          y: yOffset,
          opacity,
          duration: 0.1,
          ease: "none"
        });
      }
      if (tokenWrapperBottomRef.current) {
        const yOffset = -progress2 * 170;
        const scale = 1 + progress2 * 0.5;
        gsap.to(tokenWrapperBottomRef.current, {
          y: yOffset,
          scale,
          duration: 0.1,
          ease: "none"
        });
        const solidToken = tokenWrapperBottomRef.current.querySelector(`.${styles$1.tokenSolid}`);
        if (solidToken) {
          const borderWidth = progress2 * 1;
          const padding = progress2 * 16;
          gsap.set(solidToken, {
            borderWidth: `${borderWidth}px`,
            borderStyle: "solid",
            borderColor: "#000",
            borderRadius: "50%",
            padding: `${padding}px`,
            boxSizing: "border-box"
          });
        }
      }
      if (tokenWrapperBottomRef.current) {
        gsap.to(tokenWrapperBottomRef.current, {
          y: -progress2 * 170 - progress3 * 200,
          duration: 0.1,
          ease: "none"
        });
      }
      if (lineTopRef.current && lineBottomRef.current) {
        const lineEnd = 0.3;
        const lineProgress = progress4 < lineEnd ? mapRange(0, lineEnd, progress4, 0, 1) : 1;
        const width = lineProgress * 98;
        const opacity = progress4 > 0 ? 1 : 0;
        gsap.to([lineTopRef.current, lineBottomRef.current], {
          width: `${width}vw`,
          opacity,
          duration: 0.1,
          ease: "none"
        });
      }
      if (tokenWrapperBottomRef.current) {
        const fadeStart = 0.1;
        const tokenOpacity = progress4 < fadeStart ? 1 : 1 - clamp(0, mapRange(fadeStart, fadeStart + 0.2, progress4, 0, 1), 1);
        gsap.to(tokenWrapperBottomRef.current, {
          opacity: tokenOpacity,
          duration: 0.1,
          ease: "none"
        });
      }
      if (videoRef.current) {
        const video2 = videoRef.current;
        const opacity = progress4 > 0 ? 1 : 0;
        gsap.set(video2, {
          opacity,
          y: -progress5 * 300
        });
        if (video2.duration) {
          const targetTime = progress4 * video2.duration;
          video2.currentTime = targetTime;
        }
        if (!video2.paused) {
          video2.pause();
        }
      }
      if (ctaRef.current) {
        const ctaStart = 0.3;
        const ctaProgress = progress4 < ctaStart ? 0 : mapRange(ctaStart, 1, progress4, 0, 1);
        const ctaOpacity = ctaProgress;
        const ctaY = (1 - ctaProgress) * 100 - progress5 * 300 - progress6 * 500;
        gsap.to(ctaRef.current, {
          opacity: ctaOpacity,
          y: ctaY,
          duration: 0.1,
          ease: "none"
        });
      }
      if (circleRef.current && pathRef.current) {
        const pathProgress = progress5;
        const pathLength = pathRef.current.getTotalLength();
        const point = pathRef.current.getPointAtLength(pathProgress * pathLength);
        gsap.set(circleRef.current, {
          x: point.x,
          y: point.y,
          xPercent: -50,
          yPercent: -50
        });
      }
    },
    [windowHeight, windowWidth]
  );
  useEffect(() => {
    if (animationPlayed.current) return;
    const timeline = gsap.timeline({ delay: 0.5 });
    timeline.fromTo(
      navBarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );
    timeline.fromTo(
      titleContainerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.6"
    );
    animationPlayed.current = true;
    return () => {
      timeline.kill();
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: styles$1.container, ref: containerRef, children: [
    /* @__PURE__ */ jsx("div", { ref: navBarRef, className: styles$1.navBarWrapper, children: /* @__PURE__ */ jsx(NavBar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: styles$1.content, ref: contentRef, children: [
      /* @__PURE__ */ jsx("div", { ref: tokenWrapperTopRef, children: /* @__PURE__ */ jsx(TokenPattern, {}) }),
      /* @__PURE__ */ jsx("div", { className: styles$1.iusdText, ref: iusdTextRef, style: { opacity: 0 }, children: "iUSD" }),
      /* @__PURE__ */ jsxs("div", { ref: titleContainerRef, className: styles$1.titleWrapper, children: [
        /* @__PURE__ */ jsx("div", { ref: lineTopRef, className: styles$1.divider }),
        /* @__PURE__ */ jsxs("div", { className: styles$1.title, ref: titleRef, children: [
          "The Stablecoin That ",
          /* @__PURE__ */ jsx("br", {}),
          "Fuels Initia's Economy"
        ] }),
        /* @__PURE__ */ jsx("div", { ref: lineBottomRef, className: styles$1.divider })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: tokenWrapperBottomRef, children: /* @__PURE__ */ jsx(TokenPattern, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$1.videoSection, children: /* @__PURE__ */ jsx(
      "video",
      {
        ref: videoRef,
        src: "/iusd.mp4",
        muted: true,
        playsInline: true,
        preload: "auto",
        className: styles$1.video
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { ref: ctaRef, className: styles$1.ctaWrapper, children: [
      /* @__PURE__ */ jsx("div", { className: styles$1.cta, children: "GET iUSD NOW" }),
      /* @__PURE__ */ jsx("div", { ref: contentSectionRef, className: styles$1.contentSection, children: /* @__PURE__ */ jsxs("div", { className: styles$1.featureSection, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$1.featureContentLeft, children: [
          /* @__PURE__ */ jsx("h2", { children: "Instant Liquidity" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: styles$1.pathSvg,
            viewBox: "0 0 1634 1431",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                ref: pathRef,
                d: "M1027.57 0C1225.13 0 1385.28 160.152 1385.28 357.71C1385.28 555.268 1225.13 715.42 1027.57 715.42H354.042C158.727 717.391 1 876.619 1 1072.4C1.00026 1269.41 160.705 1429.4 357.71 1429.4H1633.5V1430.4H357.71C160.152 1430.4 0.000264031 1269.96 0 1072.4C0 879.984 151.925 722.777 342.364 714.725V714.42H354.091C355.296 714.408 356.502 714.4 357.71 714.4H1030V714.411C1225.89 713.103 1384.28 553.904 1384.28 357.71C1384.28 160.704 1224.57 1 1027.57 1H1019.5V0H1027.57Z",
                stroke: "#666",
                strokeWidth: "1",
                fill: "none"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: styles$1.featureContentRight, children: [
          /* @__PURE__ */ jsx("h2", { children: "Powering Finance Together" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            " "
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {})
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient
  });
  return router;
}
export {
  getRouter
};
