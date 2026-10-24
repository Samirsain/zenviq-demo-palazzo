"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { useReducedMotion, useInView } from "framer-motion"
import { useEffect, useRef, useState, type CSSProperties } from "react"

const FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&display=swap"
const SERIF_CANVAS = `italic 400 PXpx "Instrument Serif", Georgia, serif`
const SANS = `"Geist", system-ui, sans-serif`

interface Img {
    src: string
    srcSet?: string
    alt?: string
}

interface FoggedWindowProps {
    image?: Img
    word: string
    wordColor: string
    wordY: number
    wordWidth: number
    fogTint: string
    fogStrength: number
    brush: number
    brushMobile: number
    regrow: number
    writeDelay: number
    writeDuration: number
    fadeAfter: number
    rewriteIdle: number
    droplets: boolean
    showHint: boolean
    hintLabel: string
    bone: string
    style?: CSSProperties
}

interface Drop {
    x: number
    y: number
    r: number
    v: number
    life: number
}

/**
 * Fogged window: a warm room seen through misted glass. A word is written
 * into the fog, the cursor or a finger wipes clear patches, and the fog
 * creeps back.
 *
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
function FoggedWindow(props: FoggedWindowProps) {
    const {
        image = {
            src: "/images/EZs84HTf5FfF0E4FoxpNDqsHU.jpg",
            alt: "The dining room through the front window at night",
        },
        word = "Come in",
        wordColor = "rgba(255,214,160,0.12)",
        wordY = 30,
        wordWidth = 54,
        fogTint = "rgba(209,219,232,0.26)",
        fogStrength = 1,
        brush = 96,
        brushMobile = 64,
        regrow = 8,
        writeDelay = 0.7,
        writeDuration = 2.6,
        fadeAfter = 30,
        rewriteIdle = 9,
        droplets = true,
        showHint = true,
        hintLabel = "Wipe the glass to look inside",
        bone = "#EEE7DB",
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const reduced = !!useReducedMotion()
    const rootRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const inView = useInView(rootRef, { margin: "100px" })
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        if (!root || !canvas || typeof window === "undefined") return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = 0
        let h = 0
        let dpr = 1
        const fog = document.createElement("canvas")
        const mask = document.createElement("canvas")
        const text = document.createElement("canvas")
        const small = document.createElement("canvas")
        const fctx = fog.getContext("2d")!
        const mctx = mask.getContext("2d")!
        const tctx = text.getContext("2d")!
        const sctx = small.getContext("2d")!
        const MS = 0.5 // mask scale
        let img: HTMLImageElement | null = null
        let textBox = { x: 0, y: 0, w: 0, h: 0 }
        let raf = 0
        let last = performance.now()
        let writeStart = performance.now() + writeDelay * 1000
        let lastInput = 0
        let pointer: { x: number; y: number } | null = null
        let prevPointer: { x: number; y: number } | null = null
        const drops: Drop[] = []
        let running = true

        const coverDraw = (c: CanvasRenderingContext2D, cw: number, ch: number) => {
            if (!img || !img.naturalWidth) return
            const ir = img.naturalWidth / img.naturalHeight
            const cr = cw / ch
            let dw = cw
            let dh = ch
            if (ir > cr) dw = ch * ir
            else dh = cw / ir
            c.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
        }

        const buildFog = () => {
            fog.width = Math.max(1, Math.round(w * dpr))
            fog.height = Math.max(1, Math.round(h * dpr))
            fctx.setTransform(1, 0, 0, 1, 0, 0)
            // Blur by downscaling, works in every browser
            const sw = Math.max(8, Math.round(w / 14))
            const sh = Math.max(8, Math.round(h / 14))
            small.width = sw
            small.height = sh
            sctx.imageSmoothingEnabled = true
            sctx.clearRect(0, 0, sw, sh)
            coverDraw(sctx, sw, sh)
            fctx.imageSmoothingEnabled = true
            fctx.imageSmoothingQuality = "high"
            fctx.clearRect(0, 0, fog.width, fog.height)
            fctx.drawImage(small, 0, 0, fog.width, fog.height)
            fctx.fillStyle = fogTint
            fctx.globalAlpha = Math.min(1, Math.max(0, fogStrength))
            fctx.fillRect(0, 0, fog.width, fog.height)
            fctx.globalAlpha = 1
            // soft condensation grain
            fctx.fillStyle = "rgba(255,255,255,0.035)"
            for (let i = 0; i < (w * h) / 900; i++) {
                const x = Math.random() * fog.width
                const y = Math.random() * fog.height
                fctx.fillRect(x, y, dpr, dpr)
            }
        }

        const buildText = () => {
            text.width = Math.max(1, Math.round(w * dpr))
            text.height = Math.max(1, Math.round(h * dpr))
            tctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            tctx.clearRect(0, 0, w, h)
            if (!word) return
            const mobile = w < 700
            const targetW = w * ((mobile ? Math.min(92, wordWidth * 1.6) : wordWidth) / 100)
            let size = 100
            tctx.font = SERIF_CANVAS.replace("PX", String(size))
            const mw = tctx.measureText(word).width || 1
            size = Math.min((targetW / mw) * 100, h * 0.34)
            tctx.font = SERIF_CANVAS.replace("PX", String(size))
            tctx.textAlign = "center"
            tctx.textBaseline = "middle"
            const cy = (h * wordY) / 100
            tctx.fillStyle = "#000"
            tctx.fillText(word, w / 2, cy)
            const realW = tctx.measureText(word).width
            textBox = { x: w / 2 - realW / 2 - size * 0.1, y: cy - size * 0.6, w: realW + size * 0.2, h: size * 1.2 }
        }

        const resize = () => {
            const r = root.getBoundingClientRect()
            w = Math.max(1, r.width)
            h = Math.max(1, r.height)
            dpr = Math.min(1.5, window.devicePixelRatio || 1)
            canvas.width = Math.round(w * dpr)
            canvas.height = Math.round(h * dpr)
            mask.width = Math.max(1, Math.round(w * MS))
            mask.height = Math.max(1, Math.round(h * MS))
            mctx.clearRect(0, 0, mask.width, mask.height)
            buildFog()
            buildText()
        }

        const wipe = (x0: number, y0: number, x1: number, y1: number, radius: number) => {
            const dist = Math.hypot(x1 - x0, y1 - y0)
            const steps = Math.max(1, Math.ceil(dist / (radius * 0.25)))
            for (let i = 0; i <= steps; i++) {
                const x = (x0 + ((x1 - x0) * i) / steps) * MS
                const y = (y0 + ((y1 - y0) * i) / steps) * MS
                const r = radius * MS
                const g = mctx.createRadialGradient(x, y, 0, x, y, r)
                g.addColorStop(0, "rgba(0,0,0,0.9)")
                g.addColorStop(0.55, "rgba(0,0,0,0.6)")
                g.addColorStop(1, "rgba(0,0,0,0)")
                mctx.fillStyle = g
                mctx.beginPath()
                mctx.arc(x, y, r, 0, Math.PI * 2)
                mctx.fill()
            }
            if (droplets && dist > 4 && drops.length < 60 && Math.random() < 0.18) {
                const ang = Math.random() * Math.PI * 2
                drops.push({
                    x: x1 + Math.cos(ang) * radius * 0.85,
                    y: y1 + Math.abs(Math.sin(ang)) * radius * 0.6,
                    r: 1.6 + Math.random() * 2.2,
                    v: 10 + Math.random() * 30,
                    life: 2 + Math.random() * 3,
                })
            }
        }

        const draw = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            // fog creeps back
            if (regrow > 0) {
                mctx.globalCompositeOperation = "destination-out"
                mctx.fillStyle = `rgba(0,0,0,${Math.min(1, (dt / regrow) * 1.4)})`
                mctx.fillRect(0, 0, mask.width, mask.height)
                mctx.globalCompositeOperation = "source-over"
            }
            // wipe
            if (pointer) {
                const radius = (w < 700 ? brushMobile : brush) / 2
                const from = prevPointer ?? pointer
                wipe(from.x, from.y, pointer.x, pointer.y, radius)
                prevPointer = pointer
                pointer = null
            }
            // droplets
            for (let i = drops.length - 1; i >= 0; i--) {
                const d = drops[i]
                d.v += 40 * dt
                const ny = d.y + d.v * dt
                mctx.fillStyle = "rgba(0,0,0,0.55)"
                mctx.beginPath()
                mctx.ellipse(d.x * MS, ((d.y + ny) / 2) * MS, d.r * MS * 0.7, ((ny - d.y) / 2 + d.r) * MS, 0, 0, Math.PI * 2)
                mctx.fill()
                d.y = ny
                d.life -= dt
                if (d.life <= 0 || d.y > h) drops.splice(i, 1)
            }

            // writing strength
            const tWrite = (now - writeStart) / 1000
            const reveal = Math.max(0, Math.min(1, tWrite / writeDuration))
            const easeReveal = 1 - Math.pow(1 - reveal, 3)
            const fade = tWrite > writeDuration ? Math.max(0, 1 - (tWrite - writeDuration) / fadeAfter) : 1
            if (fade < 0.4 && now - lastInput > rewriteIdle * 1000) {
                writeStart = now + 300
            }

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.globalCompositeOperation = "source-over"
            ctx.drawImage(fog, 0, 0)
            ctx.globalCompositeOperation = "destination-out"
            ctx.drawImage(mask, 0, 0, canvas.width, canvas.height)
            if (easeReveal > 0 && fade > 0) {
                ctx.save()
                ctx.globalAlpha = 0.92 * fade
                ctx.beginPath()
                ctx.rect(0, 0, (textBox.x + textBox.w * easeReveal) * dpr, canvas.height)
                ctx.clip()
                ctx.drawImage(text, 0, 0)
                ctx.restore()
            }
            ctx.globalCompositeOperation = "source-over"
        }

        const loop = (now: number) => {
            if (!running) return
            draw(now)
            raf = requestAnimationFrame(loop)
        }

        const onMove = (e: PointerEvent) => {
            const r = root.getBoundingClientRect()
            const x = e.clientX - r.left
            const y = e.clientY - r.top
            if (x < 0 || y < 0 || x > r.width || y > r.height) {
                prevPointer = null
                return
            }
            pointer = { x, y }
            lastInput = performance.now()
        }

        const start = () => {
            resize()
            if (isStatic || reduced) {
                writeStart = performance.now() - (writeDuration + 0.1) * 1000
                draw(performance.now())
                if (reduced && !isStatic) {
                    // fog shows already wiped
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                }
                setReady(true)
                return
            }
            setReady(true)
            last = performance.now()
            raf = requestAnimationFrame(loop)
        }

        img = new Image()
        img.onload = () => {
            if (document.fonts && document.fonts.load) {
                document.fonts
                    .load(SERIF_CANVAS.replace("PX", "100"))
                    .catch(() => {})
                    .finally(start)
            } else start()
        }
        img.onerror = start
        img.src = image?.src ?? ""

        const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
            if (!img) return
            resize()
            if (isStatic || reduced) draw(performance.now())
        }) : null
        ro?.observe(root)
        if (!isStatic && !reduced) window.addEventListener("pointermove", onMove, { passive: true })

        return () => {
            running = false
            cancelAnimationFrame(raf)
            ro?.disconnect()
            window.removeEventListener("pointermove", onMove)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image?.src, word, wordY, wordWidth, fogTint, fogStrength, brush, brushMobile, regrow, writeDelay, writeDuration, fadeAfter, rewriteIdle, droplets, isStatic, reduced, inView])

    return (
        <div
            ref={rootRef}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: "#1a1410",
                touchAction: "pan-y",
            }}
        >
            <link rel="stylesheet" href={FONT_HREF} />
            <img
                src={image?.src}
                srcSet={image?.srcSet}
                alt={image?.alt ?? ""}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: wordColor, mixBlendMode: "screen", pointerEvents: "none" }} />
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: ready ? 1 : 0,
                    transition: "opacity 1.2s ease-out",
                }}
            />
            {showHint && (
                <div
                    style={{
                        position: "absolute",
                        left: 40,
                        bottom: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "9px 14px 9px 10px",
                        borderRadius: 999,
                        border: `1px solid ${bone}`,
                        background: "rgba(17,18,20,0.55)",
                        backdropFilter: "blur(7px)",
                        WebkitBackdropFilter: "blur(7px)",
                        fontFamily: SANS,
                        fontSize: 14,
                        color: bone,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={bone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 11V6a2 2 0 0 0-4 0v1" />
                        <path d="M14 10V4a2 2 0 0 0-4 0v2" />
                        <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                    {hintLabel}
                </div>
            )}
        </div>
    )
}

addPropertyControls(FoggedWindow, {
    image: { type: ControlType.ResponsiveImage, title: "Room" },
    word: { type: ControlType.String, title: "Word", defaultValue: "Come in" },
    wordY: { type: ControlType.Number, title: "Word Y", defaultValue: 30, min: 10, max: 90, unit: "%" },
    wordWidth: { type: ControlType.Number, title: "Word width", defaultValue: 54, min: 20, max: 95, unit: "%" },
    wordColor: { type: ControlType.Color, title: "Warm glow", defaultValue: "rgba(255,214,160,0.12)" },
    fogTint: { type: ControlType.Color, title: "Fog tint", defaultValue: "rgba(209,219,232,0.26)" },
    fogStrength: { type: ControlType.Number, title: "Fog strength", defaultValue: 1, min: 0, max: 1, step: 0.05 },
    brush: { type: ControlType.Number, title: "Brush", defaultValue: 96, min: 24, max: 240, unit: "px" },
    brushMobile: { type: ControlType.Number, title: "Brush (phone)", defaultValue: 64, min: 24, max: 200, unit: "px" },
    regrow: { type: ControlType.Number, title: "Fog regrow", defaultValue: 8, min: 1, max: 30, step: 0.5, unit: "s" },
    writeDelay: { type: ControlType.Number, title: "Write delay", defaultValue: 0.7, min: 0, max: 5, step: 0.1, unit: "s" },
    writeDuration: { type: ControlType.Number, title: "Write time", defaultValue: 2.6, min: 0.5, max: 8, step: 0.1, unit: "s" },
    fadeAfter: { type: ControlType.Number, title: "Word fades", defaultValue: 30, min: 5, max: 120, unit: "s" },
    rewriteIdle: { type: ControlType.Number, title: "Rewrite idle", defaultValue: 9, min: 2, max: 60, unit: "s" },
    droplets: { type: ControlType.Boolean, title: "Droplets", defaultValue: true },
    showHint: { type: ControlType.Boolean, title: "Hint", defaultValue: true },
    hintLabel: { type: ControlType.String, title: "Hint label", defaultValue: "Wipe the glass to look inside", hidden: (p: any) => !p.showHint },
    bone: { type: ControlType.Color, title: "Bone", defaultValue: "#EEE7DB" },
})

export default withControls(FoggedWindow)
