"use client"

import type { ComponentType, CSSProperties, ReactNode } from "react"

// Minimal stand-in for Framer's runtime so the code components exported from Framer run unchanged in Next.js.

type Control = {
    type: string
    title?: string
    defaultValue?: unknown
    control?: Control
    controls?: Record<string, Control>
    [key: string]: unknown
}

export const ControlType = new Proxy({} as Record<string, string>, { get: (_, key) => String(key) })

const registry = new WeakMap<object, Record<string, Control>>()

export function addPropertyControls(component: object, controls: Record<string, Control>) {
    registry.set(component, controls)
}

export const useIsStaticRenderer = () => false

const camel = (s: string) =>
    s.replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toLowerCase())

function convert(control: Control, raw: unknown): unknown {
    if (raw === undefined) return control.defaultValue
    switch (control.type) {
        case "Number":
            return Number(raw)
        case "Boolean":
            return raw === true || raw === "true"
        case "Enum": {
            // instances store the option title ("Compact"); the component expects the option value ("compact")
            const options = (control.options as unknown[]) ?? []
            const titles = (control.optionTitles as unknown[]) ?? []
            return options.includes(raw) ? raw : (options[titles.indexOf(raw)] ?? raw)
        }
        case "ResponsiveImage":
        case "Image":
            return typeof raw === "string" ? { src: raw } : raw
        case "Array":
            return Array.isArray(raw) ? raw.map((item) => (control.control ? convert(control.control, item) : item)) : control.defaultValue
        case "Object":
            return mapControls(control.controls ?? {}, raw as Record<string, unknown>)
        default:
            return raw
    }
}

function mapControls(controls: Record<string, Control>, raw: Record<string, unknown>) {
    const out: Record<string, unknown> = {}
    for (const [key, control] of Object.entries(controls)) {
        let value = raw[camel(control.title ?? key)] ?? raw[key]
        if (control.type === "Slot") value ??= raw.children
        const converted = convert(control, value)
        if (converted !== undefined) out[key] = converted
    }
    return out
}

// Framer passes control values keyed by their titles and as strings; map them onto the component's real props.
export function withControls<P extends object>(Component: ComponentType<P>) {
    return function Controlled(raw: Record<string, unknown> & { style?: CSSProperties; children?: ReactNode }) {
        const props = mapControls(registry.get(Component) ?? {}, raw)
        return <Component {...(props as P)} style={raw.style} />
    }
}
