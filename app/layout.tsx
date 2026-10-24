import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ZenviqBadge from "@/components/ZenviqBadge"
import SmoothScroll from "@/components/code/SmoothScroll"
import type { Metadata } from "next"
import { Geist, Instrument_Serif } from "next/font/google"
import "./globals.css"
import s from "./layout.module.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument" })

export const metadata: Metadata = {
    title: {
        default: "Palazzo — Eight-Course Tasting Menu in Jaipur · Demo by ZENVIQ Digital",
        template: "%s · Demo by ZENVIQ Digital",
    },
    description: "Palazzo is a demo restaurant website by ZENVIQ Digital: an eight-course tasting menu restaurant on Sardar Patel Marg, Jaipur.",
    creator: "ZENVIQ Digital",
    // Demo site: the restaurant is fictional, so keep it out of search results
    robots: { index: false, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en-IN" className={`${geist.variable} ${instrument.variable}`}>
            <body>
                <div className={s.site}>
                    <Navigation className={s.navigation} variant="Desktop" variantTablet="Tablet" variantPhone="Phone" />
                    {children}
                    <Footer className={s.footer} variant="Desktop" variantTablet="Tablet" variantPhone="Phone" />
                    <ZenviqBadge />
                    <div className={s.smoothScroll}>
                        <SmoothScroll smoothness={"0.09"} style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </body>
        </html>
    )
}
