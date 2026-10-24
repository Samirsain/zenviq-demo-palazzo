"use client"

import { motion, useReducedMotion, type Transition } from "framer-motion"
import type { ElementType, ReactNode } from "react"

type Props = {
    as?: ElementType
    enter: Record<string, number | string>
    transition?: Transition
    amount?: number
    once?: boolean
    delay?: number
    className?: string
    children?: ReactNode
    [key: string]: unknown
}

const motionCache = new Map<ElementType, ElementType>()
function motionFor(as: ElementType): ElementType {
    if (typeof as === "string") return (motion as unknown as Record<string, ElementType>)[as]
    if (!motionCache.has(as)) motionCache.set(as, motion.create(as) as ElementType)
    return motionCache.get(as)!
}

const rest = (enter: Props["enter"]) =>
    Object.fromEntries(Object.keys(enter).map((k) => [k, k === "opacity" || k === "scale" ? 1 : k === "filter" ? "blur(0px)" : 0]))

// Framer's "appear" effect: animate from `enter` to the resting state when scrolled into view.
export default function Appear({ as = "div", enter, transition, amount = 0.2, once = true, delay = 0, ...props }: Props) {
    const reduce = useReducedMotion()
    if (reduce) {
        const Tag = as
        return <Tag {...props} />
    }
    const M = motionFor(as)
    return (
        <M
            initial={enter}
            whileInView={rest(enter)}
            viewport={{ once, amount }}
            transition={{ ...transition, delay: (transition?.delay ?? 0) + delay }}
            {...props}
        />
    )
}
