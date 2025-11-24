/// <reference types="vite/client" />
import * as React from "react"
import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router"

import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary"
import { NotFound } from "~/components/NotFound"
import { Lenis } from "~/providers/lenis"
import fontsCss from "~/styles/fonts.css?url"
import globalCss from "~/styles/globals.css?url"
import resetCss from "~/styles/reset.css?url"
import variableCss from "~/styles/variables.css?url"
import { seo } from "~/utils/seo"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "iUSD Landing Page",
        description: ``,
      }),
    ],
    links: [
      { rel: "stylesheet", href: fontsCss },
      { rel: "stylesheet", href: variableCss },
      { rel: "stylesheet", href: globalCss },
      { rel: "stylesheet", href: resetCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Lenis>
        <Outlet />
      </Lenis>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
