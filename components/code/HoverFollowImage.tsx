"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, startTransition, type CSSProperties } from "react"
import { createPortal } from "react-dom"

interface Img {
    src: string
    srcSet?: string
    alt?: string
}

interface HoverFollowImageProps {
    image?: Img
    rowName: string
    listName: string
    size: number
    zoom: number
    dimTo: number
    style?: CSSProperties
}

/**
 * Put inside a list row. While the row is hovered, its plate follows the
 * cursor on a spring and the other rows dim.
 *
 * @framerIntrinsicWidth 40
 * @framerIntrinsicHeight 40
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
function HoverFollowImage(props: HoverFollowImageProps) {
    const {
        image = { src: "/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg", alt: "" },
        rowName = "Course row",
        listName = "Course list",
        size = 260,
        zoom = 1.08,
        dimTo = 0.5,
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const reduced = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const [hover, setHover] = useState(false)
    const [mounted, setMounted] = useState(false)
    const mx = useMotionValue(0)
    const my = useMotionValue(0)
    const x = useSpring(mx, { stiffness: 90, damping: 20 })
    const y = useSpring(my, { stiffness: 90, damping: 20 })

    useEffect(() => {
        setMounted(true)
        if (isStatic) return
        const el = ref.current
        if (!el || typeof window === "undefined") return
        if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
        const row = el.closest(`[data-framer-name="${rowName}"]`) as HTMLElement | null
        if (!row) return
        const list = row.closest(`[data-framer-name="${listName}"]`) as HTMLElement | null
        const rows = (): HTMLElement[] =>
            list ? (Array.from(list.querySelectorAll(`[data-framer-name="${rowName}"]`)) as HTMLElement[]) : []

        const enter = (e: PointerEvent) => {
            mx.jump(e.clientX)
            my.jump(e.clientY)
            x.jump(e.clientX)
            y.jump(e.clientY)
            startTransition(() => setHover(true))
            for (const r of rows()) {
                r.style.transition = "opacity 0.5s cubic-bezier(.16,1,.3,1)"
                r.style.opacity = r === row ? "1" : String(dimTo)
            }
        }
        const move = (e: PointerEvent) => {
            mx.set(e.clientX)
            my.set(e.clientY)
        }
        const leave = () => {
            startTransition(() => setHover(false))
            for (const r of rows()) r.style.opacity = "1"
        }
        row.addEventListener("pointerenter", enter)
        row.addEventListener("pointermove", move)
        row.addEventListener("pointerleave", leave)
        return () => {
            row.removeEventListener("pointerenter", enter)
            row.removeEventListener("pointermove", move)
            row.removeEventListener("pointerleave", leave)
        }
    }, [isStatic, rowName, listName, dimTo, mx, my, x, y])

    const follower = (
        <AnimatePresence>
            {hover && (
                <motion.div
                    key="plate"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -20 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        x,
                        y,
                        width: size,
                        height: size,
                        marginLeft: -size / 2,
                        marginTop: -size / 2,
                        borderRadius: "50%",
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: 50,
                        boxShadow: "0 30px 50px rgba(0,0,0,0.55)",
                    }}
                >
                    <img
                        src={image?.src}
                        srcSet={image?.srcSet}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )

    return (
        <div ref={ref} aria-hidden="true" style={{ ...style, position: "relative", pointerEvents: "none" }}>
            {isStatic && (
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: "1px dashed rgba(238,231,219,0.35)" }} />
            )}
            {mounted && typeof document !== "undefined" ? createPortal(follower, document.body) : null}
        </div>
    )
}

addPropertyControls(HoverFollowImage, {
    image: { type: ControlType.ResponsiveImage, title: "Plate" },
    rowName: { type: ControlType.String, title: "Row layer", defaultValue: "Course row" },
    listName: { type: ControlType.String, title: "List layer", defaultValue: "Course list" },
    size: { type: ControlType.Number, title: "Size", defaultValue: 260, min: 80, max: 480, unit: "px" },
    zoom: { type: ControlType.Number, title: "Plate zoom", defaultValue: 1.08, min: 1, max: 1.6, step: 0.01 },
    dimTo: { type: ControlType.Number, title: "Dim others", defaultValue: 0.5, min: 0, max: 1, step: 0.05 },
})

export default withControls(HoverFollowImage)
