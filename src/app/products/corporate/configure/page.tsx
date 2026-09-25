import * as React from "react"
import type { Metadata } from "next"
import { CorporateConfigureClient } from "./corporate-configure-client"

export const metadata: Metadata = {
  title: "Customize Your Corporate Smart NFC Cards | TapOnce Enterprise",
  description:
    "Design fully branded corporate NFC business cards for your company. Upload your logo, choose custom brand finishes, configure front & back layouts, and request volume pricing.",
  openGraph: {
    title: "Corporate Smart NFC Card Studio — TapOnce",
    description: "Design bespoke smart business cards for teams and enterprise organizations.",
  },
}

export default function CorporateConfigurePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CorporateConfigureClient />
    </React.Suspense>
  )
}
