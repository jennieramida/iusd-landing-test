import { ReactLenis } from "lenis/react"

interface LenisProps {
  children?: React.ReactNode
}

// eslint-disable-next-line iusd/react-props-interface
export function Lenis({ children }: LenisProps) {
  return <ReactLenis root>{children}</ReactLenis>
}
