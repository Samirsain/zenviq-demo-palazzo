"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { useRef, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from "react"

interface TiltCardProps {
    children?: ReactNode
    maxTilt: number
    restRotate: number
    sheen: boolean
    radius: number
    style?: CSSProperties
}

/**
 * Wraps a card: it tilts toward the cursor on a spring and a soft light
 * sheen slides across it.
 *
 * @framerIntrinsicWidth 440
 * @framerIntrinsicHeight 272
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
function TiltCard(props: TiltCardProps) {
    const { children, maxTilt = 10, restRotate = 6, sheen = true, radius = 16, style } = props
    const isStatic = useIsStaticRenderer()
    const reduced = useReducedMotion()
    const ref = useRef<HTMLDivElement>(null)
    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const sx = useSpring(px, { stiffness: 120, damping: 18 })
    const sy = useSpring(py, { stiffness: 120, damping: 18 })
    const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])
    const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
    const sheenX = useTransform(sx, [0, 1], ["-30%", "130%"])
    const sheenOpacity = useTransform(sx, (v) => 0.15 + Math.abs(v - 0.5) * 0.5)

    const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (isStatic || reduced || e.pointerType === "touch") return
        const r = e.currentTarget.getBoundingClientRect()
        px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
        py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)))
    }
    const onLeave = () => {
        px.set(0.5)
        py.set(0.5)
    }

    return (
        <div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                perspective: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                style={{
                    position: "relative",
                    rotate: restRotate,
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    borderRadius: radius,
                }}
            >
                {children}
                {sheen && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: radius,
                            overflow: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <motion.div
                            style={{
                                position: "absolute",
                                top: "-20%",
                                bottom: "-20%",
                                width: "45%",
                                left: sheenX,
                                x: "-50%",
                                opacity: sheenOpacity,
                                background:
                                    "linear-gradient(105deg, rgba(255,240,215,0) 0%, rgba(255,240,215,0.55) 50%, rgba(255,240,215,0) 100%)",
                                mixBlendMode: "soft-light",
                            }}
                        />
                    </div>
                )}
            </motion.div>
        </div>
    )
}

addPropertyControls(TiltCard, {
    children: { type: ControlType.Slot, title: "Card", maxCount: 1 },
    maxTilt: { type: ControlType.Number, title: "Tilt", defaultValue: 10, min: 0, max: 25, unit: "°" },
    restRotate: { type: ControlType.Number, title: "Rest angle", defaultValue: 6, min: -20, max: 20, unit: "°" },
    sheen: { type: ControlType.Boolean, title: "Sheen", defaultValue: true },
    radius: { type: ControlType.Number, title: "Radius", defaultValue: 16, min: 0, max: 40, unit: "px" },
})

export default withControls(TiltCard)
