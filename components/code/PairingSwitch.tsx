"use client"

import { addPropertyControls, ControlType, withControls } from "@/lib/framer"
import { useEffect, useState, startTransition, type CSSProperties } from "react"

const PAIRING_KEY = "__palazzoPairing"
const PAIRING_EVENT = "palazzo-pairing"
const SANS = `"Geist", system-ui, sans-serif`

function readPairing(): string {
    if (typeof window === "undefined") return "wine"
    return (window as any)[PAIRING_KEY] ?? "wine"
}

function writePairing(value: string) {
    if (typeof window === "undefined") return
    ;(window as any)[PAIRING_KEY] = value
    window.dispatchEvent(new CustomEvent(PAIRING_EVENT, { detail: value }))
}

interface PairingSwitchProps {
    label: string
    mode: "wine-soft" | "wine" | "soft"
    fontSize: number
    textColor: string
    trackOff: string
    trackOn: string
    thumb: string
    style?: CSSProperties
}

/**
 * Pairing switch. Every switch, pairing line and price on the page follows it.
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
function PairingSwitch(props: PairingSwitchProps) {
    const {
        label = "Wine pairing",
        mode = "wine-soft",
        fontSize = 15,
        textColor = "#EEE7DB",
        trackOff = "rgba(238,231,219,0.18)",
        trackOn = "#C9A56B",
        thumb = "#EEE7DB",
        style,
    } = props
    const [value, setValue] = useState("wine")

    useEffect(() => {
        startTransition(() => setValue(readPairing()))
        const h = (e: Event) => startTransition(() => setValue((e as CustomEvent).detail))
        window.addEventListener(PAIRING_EVENT, h)
        return () => window.removeEventListener(PAIRING_EVENT, h)
    }, [])

    const on = mode === "soft" ? value === "soft" : value === "wine"
    const toggle = () => {
        if (mode === "wine-soft") writePairing(on ? "soft" : "wine")
        else if (mode === "wine") writePairing(on ? "none" : "wine")
        else writePairing(on ? "none" : "soft")
    }

    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            onClick={toggle}
            style={{
                ...style,
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: textColor,
                fontFamily: SANS,
                fontSize,
                lineHeight: 1.3,
                minWidth: "max-content",
            }}
        >
            <span
                style={{
                    width: 38,
                    height: 22,
                    borderRadius: 999,
                    background: on ? trackOn : trackOff,
                    position: "relative",
                    flexShrink: 0,
                    transition: "background 0.4s cubic-bezier(.16,1,.3,1)",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: 3,
                        left: on ? 19 : 3,
                        width: 16,
                        height: 16,
                        borderRadius: 999,
                        background: thumb,
                        transition: "left 0.4s cubic-bezier(.16,1,.3,1)",
                    }}
                />
            </span>
            {label && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
        </button>
    )
}

addPropertyControls(PairingSwitch, {
    label: { type: ControlType.String, title: "Label", defaultValue: "Wine pairing" },
    mode: {
        type: ControlType.Enum,
        title: "Switches",
        options: ["wine-soft", "wine", "soft"],
        optionTitles: ["Wine ⇄ no alcohol", "Wine on/off", "No alcohol on/off"],
        defaultValue: "wine-soft",
    },
    fontSize: { type: ControlType.Number, title: "Size", defaultValue: 15, min: 10, max: 24, unit: "px" },
    textColor: { type: ControlType.Color, title: "Text", defaultValue: "#EEE7DB" },
    trackOff: { type: ControlType.Color, title: "Track off", defaultValue: "rgba(238,231,219,0.18)" },
    trackOn: { type: ControlType.Color, title: "Track on", defaultValue: "#C9A56B" },
    thumb: { type: ControlType.Color, title: "Thumb", defaultValue: "#EEE7DB" },
})

export default withControls(PairingSwitch)
