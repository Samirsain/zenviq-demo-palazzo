"use client"

import { addPropertyControls, ControlType, withControls } from "@/lib/framer"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useState, startTransition, type CSSProperties } from "react"

const PAIRING_KEY = "__palazzoPairing"
const PAIRING_EVENT = "palazzo-pairing"
const SANS = `"Geist", system-ui, sans-serif`
const SERIF = `"Instrument Serif", Georgia, serif`

function readPairing(): string {
    if (typeof window === "undefined") return "wine"
    return (window as any)[PAIRING_KEY] ?? "wine"
}

interface PairingTextProps {
    wineText: string
    softText: string
    noneText: string
    family: "sans" | "serif"
    fontSize: number
    lineHeight: number
    color: string
    align: "left" | "center" | "right"
    style?: CSSProperties
}

/**
 * Text that crossfades with blur when the pairing switch changes.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
function PairingText(props: PairingTextProps) {
    const {
        wineText = "Paired with Chablis Premier Cru 2022",
        softText = "With pressed pear and verjus",
        noneText = "",
        family = "sans",
        fontSize = 15,
        lineHeight = 1.4,
        color = "#A9A398",
        align = "left",
        style,
    } = props
    const reduced = useReducedMotion()
    const [value, setValue] = useState("wine")

    useEffect(() => {
        startTransition(() => setValue(readPairing()))
        const h = (e: Event) => startTransition(() => setValue((e as CustomEvent).detail))
        window.addEventListener(PAIRING_EVENT, h)
        return () => window.removeEventListener(PAIRING_EVENT, h)
    }, [])

    const text = value === "soft" ? softText || wineText : value === "none" ? noneText || wineText : wineText
    const isFill = style?.width === "100%"

    return (
        <div
            style={{
                ...style,
                position: "relative",
                fontFamily: family === "serif" ? SERIF : SANS,
                fontSize,
                lineHeight,
                color,
                textAlign: align,
                ...(isFill ? {} : { minWidth: "max-content" }),
            }}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={text}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "block" }}
                >
                    {text}
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

addPropertyControls(PairingText, {
    wineText: { type: ControlType.String, title: "With wine", defaultValue: "Paired with Chablis Premier Cru 2022" },
    softText: { type: ControlType.String, title: "No alcohol", defaultValue: "With pressed pear and verjus" },
    noneText: { type: ControlType.String, title: "No pairing", defaultValue: "", placeholder: "Falls back to wine" },
    family: { type: ControlType.Enum, title: "Family", options: ["sans", "serif"], optionTitles: ["Geist", "Instrument Serif"], defaultValue: "sans", displaySegmentedControl: true },
    fontSize: { type: ControlType.Number, title: "Size", defaultValue: 15, min: 10, max: 120, unit: "px" },
    lineHeight: { type: ControlType.Number, title: "Line height", defaultValue: 1.4, min: 0.8, max: 2, step: 0.05 },
    color: { type: ControlType.Color, title: "Color", defaultValue: "#A9A398" },
    align: { type: ControlType.Enum, title: "Align", options: ["left", "center", "right"], defaultValue: "left", displaySegmentedControl: true },
})

export default withControls(PairingText)
