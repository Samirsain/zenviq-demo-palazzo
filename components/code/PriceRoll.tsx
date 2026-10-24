"use client"

import { addPropertyControls, ControlType, withControls } from "@/lib/framer"
import { animate, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, startTransition, type CSSProperties } from "react"

const PAIRING_KEY = "__palazzoPairing"
const PAIRING_EVENT = "palazzo-pairing"
const SANS = `"Geist", system-ui, sans-serif`
const SERIF = `"Instrument Serif", Georgia, serif`

function readPairing(): string {
    if (typeof window === "undefined") return "wine"
    return (window as any)[PAIRING_KEY] ?? "wine"
}

interface PriceRollProps {
    base: number
    wineAdd: number
    softAdd: number
    prefix: string
    suffix: string
    family: "sans" | "serif"
    fontSize: number
    color: string
    style?: CSSProperties
}

/**
 * Price that adds the chosen pairing and rolls to the new total.
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
function PriceRoll(props: PriceRollProps) {
    const {
        base = 145,
        wineAdd = 95,
        softAdd = 65,
        prefix = "₹",
        suffix = "",
        family = "serif",
        fontSize = 64,
        color = "#111214",
        style,
    } = props
    const reduced = useReducedMotion()
    const [pairing, setPairing] = useState("wine")
    const total = base + (pairing === "wine" ? wineAdd : pairing === "soft" ? softAdd : 0)
    const [shown, setShown] = useState(total)
    const prev = useRef(total)

    useEffect(() => {
        startTransition(() => setPairing(readPairing()))
        const h = (e: Event) => startTransition(() => setPairing((e as CustomEvent).detail))
        window.addEventListener(PAIRING_EVENT, h)
        return () => window.removeEventListener(PAIRING_EVENT, h)
    }, [])

    useEffect(() => {
        if (reduced) {
            setShown(total)
            prev.current = total
            return
        }
        const controls = animate(prev.current, total, {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setShown(Math.round(v)),
        })
        prev.current = total
        return () => controls.stop()
    }, [total, reduced])

    return (
        <span
            style={{
                ...style,
                display: "inline-block",
                minWidth: "max-content",
                fontFamily: family === "serif" ? SERIF : SANS,
                fontVariationSettings: family === "serif" ? undefined : undefined,
                fontSize,
                lineHeight: 1,
                letterSpacing: family === "serif" ? "-0.02em" : 0,
                color,
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
            }}
        >
            {prefix}
            {shown.toLocaleString("en-IN")}
            {suffix}
        </span>
    )
}

addPropertyControls(PriceRoll, {
    base: { type: ControlType.Number, title: "Menu", defaultValue: 145, min: 0, max: 5000, step: 1 },
    wineAdd: { type: ControlType.Number, title: "+ Wine", defaultValue: 95, min: 0, max: 5000, step: 1 },
    softAdd: { type: ControlType.Number, title: "+ No alcohol", defaultValue: 65, min: 0, max: 5000, step: 1 },
    prefix: { type: ControlType.String, title: "Prefix", defaultValue: "₹" },
    suffix: { type: ControlType.String, title: "Suffix", defaultValue: "" },
    family: { type: ControlType.Enum, title: "Family", options: ["serif", "sans"], optionTitles: ["Instrument Serif", "Geist"], defaultValue: "serif", displaySegmentedControl: true },
    fontSize: { type: ControlType.Number, title: "Size", defaultValue: 64, min: 10, max: 200, unit: "px" },
    color: { type: ControlType.Color, title: "Color", defaultValue: "#111214" },
})

export default withControls(PriceRoll)
