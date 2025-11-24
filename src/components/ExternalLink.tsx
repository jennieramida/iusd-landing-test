import type { AnchorHTMLAttributes, ReactNode } from "react"

interface ExternalLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  children: ReactNode
}

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
