"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { useEffect, type CSSProperties } from "react"

interface SmoothScrollProps {
    smoothness: number
    style?: CSSProperties
}

/**
 * Slow, smooth wheel scrolling for the whole page. Off for touch,
 * keyboard and reduced motion.
 *
 * @framerIntrinsicWidth 20
 * @framerIntrinsicHeight 20
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
function SmoothScroll(props: SmoothScrollProps) {
    const { smoothness = 0.09, style } = props
    const isStatic = useIsStaticRenderer()

    useEffect(() => {
        if (isStatic || typeof window === "undefined") return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        if (!window.matchMedia("(pointer: fine)").matches) return

        let target = window.scrollY
        let current = window.scrollY
        let raf = 0
        let animating = false

        const max = () => document.documentElement.scrollHeight - window.innerHeight

        const step = () => {
            current += (target - current) * smoothness
            if (Math.abs(target - current) < 0.5) {
                current = target
                animating = false
            }
            window.scrollTo(0, current)
            if (animating) raf = requestAnimationFrame(step)
        }

        const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.defaultPrevented) return
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
            let el = e.target as HTMLElement | null
            while (el && el !== document.body) {
                const s = getComputedStyle(el)
                if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) return
                el = el.parentElement
            }
            e.preventDefault()
            if (!animating) {
                current = window.scrollY
                target = window.scrollY
            }
            const mult = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1
            target = Math.max(0, Math.min(max(), target + e.deltaY * mult))
            if (!animating) {
                animating = true
                raf = requestAnimationFrame(step)
            }
        }

        const onScroll = () => {
            if (!animating) {
                current = window.scrollY
                target = window.scrollY
            }
        }

        window.addEventListener("wheel", onWheel, { passive: false })
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("scroll", onScroll)
        }
    }, [isStatic, smoothness])

    return <div aria-hidden="true" style={{ ...style, width: 0, height: 0, overflow: "hidden" }} />
}

addPropertyControls(SmoothScroll, {
    smoothness: { type: ControlType.Number, title: "Smoothness", defaultValue: 0.09, min: 0.03, max: 0.3, step: 0.01 },
})

export default withControls(SmoothScroll)
