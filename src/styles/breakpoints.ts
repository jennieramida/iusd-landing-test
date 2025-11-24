import { useMediaQuery } from "usehooks-ts"

type Breakpoint = "default" | "lg"

const BREAKPOINTS = {
  md: 640,
  lg: 1024,
  xl: 1280,
}

export function useIsLargeScreen(): boolean {
  return useMediaQuery(`(width >= ${BREAKPOINTS.lg}px)`)
}

export function useBreakpoint(): Breakpoint {
  const isLg = useIsLargeScreen()

  if (isLg) return "lg"
  return "default"
}
