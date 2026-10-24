"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { useEffect, useRef, type CSSProperties } from "react"

interface Img {
    src: string
    srcSet?: string
    alt?: string
}

interface SpinPlateProps {
    image?: Img
    zoom: number
    turn: number
    dragRail: boolean
    style?: CSSProperties
}

function findScroller(el: HTMLElement | null): HTMLElement | null {
    let node = el?.parentElement ?? null
    while (node && node !== document.body) {
        const s = getComputedStyle(node)
        if (/(auto|scroll)/.test(s.overflowX) && node.scrollWidth > node.clientWidth + 2) return node
        node = node.parentElement
    }
    return null
}

/**
 * Round plate photo for a sideways course rail. It turns slowly as the rail
 * moves, and (optionally) lets a mouse drag the rail with inertia.
 *
 * @framerIntrinsicWidth 300
 * @framerIntrinsicHeight 300
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
function SpinPlate(props: SpinPlateProps) {
    const {
        image = { src: "/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg", alt: "" },
        zoom = 1.08,
        turn = 0.12,
        dragRail = true,
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const reduced = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const rot = useMotionValue(0)
    const srot = useSpring(rot, { stiffness: 60, damping: 20 })

    useEffect(() => {
        if (isStatic || reduced || typeof window === "undefined") return
        let scroller: HTMLElement | null = null
        let raf = 0
        let tries = 0
        const onScroll = () => {
            if (scroller) rot.set(scroller.scrollLeft * turn)
        }
        // Mouse drag with inertia (only one plate per rail installs it)
        let cleanupDrag = () => {}
        const installDrag = (sc: HTMLElement) => {
            if (!dragRail || (sc as any).__palazzoDrag) return
            ;(sc as any).__palazzoDrag = true
            let down = false
            let lastX = 0
            let v = 0
            let lastT = 0
            let moved = 0
            let inertia = 0
            sc.style.cursor = "grab"
            const md = (e: MouseEvent) => {
                down = true
                moved = 0
                lastX = e.clientX
                lastT = performance.now()
                v = 0
                cancelAnimationFrame(inertia)
                sc.style.cursor = "grabbing"
                sc.style.scrollSnapType = "none"
            }
            const mm = (e: MouseEvent) => {
                if (!down) return
                const dx = e.clientX - lastX
                const now = performance.now()
                v = dx / Math.max(1, now - lastT)
                lastX = e.clientX
                lastT = now
                moved += Math.abs(dx)
                sc.scrollLeft -= dx
                e.preventDefault()
            }
            const glide = () => {
                v *= 0.95
                sc.scrollLeft -= v * 16
                if (Math.abs(v) > 0.02) inertia = requestAnimationFrame(glide)
            }
            const mu = () => {
                if (!down) return
                down = false
                sc.style.cursor = "grab"
                inertia = requestAnimationFrame(glide)
            }
            const click = (e: MouseEvent) => {
                if (moved > 6) {
                    e.preventDefault()
                    e.stopPropagation()
                }
            }
            sc.addEventListener("mousedown", md)
            window.addEventListener("mousemove", mm)
            window.addEventListener("mouseup", mu)
            sc.addEventListener("click", click, true)
            cleanupDrag = () => {
                cancelAnimationFrame(inertia)
                sc.removeEventListener("mousedown", md)
                window.removeEventListener("mousemove", mm)
                window.removeEventListener("mouseup", mu)
                sc.removeEventListener("click", click, true)
                ;(sc as any).__palazzoDrag = false
            }
        }
        const find = () => {
            scroller = findScroller(ref.current)
            if (scroller) {
                scroller.addEventListener("scroll", onScroll, { passive: true })
                onScroll()
                installDrag(scroller)
            } else if (tries++ < 20) {
                raf = window.setTimeout(find, 250) as unknown as number
            }
        }
        find()
        return () => {
            window.clearTimeout(raf)
            scroller?.removeEventListener("scroll", onScroll)
            cleanupDrag()
        }
    }, [isStatic, reduced, turn, dragRail, rot])

    return (
        <div ref={ref} style={{ ...style, position: "relative", width: "100%", height: "100%" }}>
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    rotate: srot,
                    boxShadow: "0 24px 40px rgba(0,0,0,0.5)",
                }}
            >
                <img
                    src={image?.src}
                    srcSet={image?.srcSet}
                    alt={image?.alt ?? ""}
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, display: "block", userSelect: "none" }}
                />
            </motion.div>
        </div>
    )
}

addPropertyControls(SpinPlate, {
    image: { type: ControlType.ResponsiveImage, title: "Plate" },
    zoom: { type: ControlType.Number, title: "Plate zoom", defaultValue: 1.08, min: 1, max: 1.6, step: 0.01 },
    turn: { type: ControlType.Number, title: "Turn", defaultValue: 0.12, min: 0, max: 1, step: 0.01, description: "Degrees per pixel scrolled" },
    dragRail: { type: ControlType.Boolean, title: "Drag rail", defaultValue: true },
})

export default withControls(SpinPlate)
