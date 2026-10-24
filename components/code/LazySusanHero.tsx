"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
    useReducedMotion,
    useInView,
    type MotionValue,
} from "framer-motion"
import {
    useEffect,
    useRef,
    useState,
    useCallback,
    startTransition,
    type CSSProperties,
    type PointerEvent as ReactPointerEvent,
    type KeyboardEvent as ReactKeyboardEvent,
    type WheelEvent as ReactWheelEvent,
} from "react"

const FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&display=swap"
const SERIF = `"Instrument Serif", Georgia, serif`
const SANS = `"Geist", system-ui, sans-serif`
const EASE = [0.16, 1, 0.3, 1] as const

const PAIRING_KEY = "__palazzoPairing"
const PAIRING_EVENT = "palazzo-pairing"

function readPairing(): string {
    if (typeof window === "undefined") return "wine"
    return (window as any)[PAIRING_KEY] ?? "wine"
}

function writePairing(value: string) {
    if (typeof window === "undefined") return
    ;(window as any)[PAIRING_KEY] = value
    window.dispatchEvent(new CustomEvent(PAIRING_EVENT, { detail: value }))
}

interface Img {
    src: string
    srcSet?: string
    alt?: string
}

interface Course {
    image?: Img
    name: string
    note: string
}

interface LazySusanHeroProps {
    courses: Course[]
    background?: Img
    table?: Img
    startCourse: number
    priceText: string
    buttonLabel: string
    buttonLink?: string
    pairingLabel: string
    hintLabel: string
    autoTurn: number
    idleDelay: number
    plateZoom: number
    ink: string
    bone: string
    dust: string
    brass: string
    style?: CSSProperties
}

const IMG = (src: string, alt: string): Img => ({ src, alt })

const DEFAULT_COURSES: Course[] = [
    { image: IMG("/images/V2RIAM3dgIZhRvjkYp6e9yDsaU.jpg", "Heirloom tomato"), name: "Heirloom tomato, *burrata,* basil", note: "First tomatoes at their ripest, torn burrata, first-press basil oil." },
    { image: IMG("/images/i51KgEHOzqI3A8F8PCSdB4E8DI.jpg", "Langoustine"), name: "Langoustine, *blood orange,* finger lime", note: "Raw langoustine in herb oil, blood orange, finger lime pearls." },
    { image: IMG("/images/AW6R8P87Vs1bVAKVN3D9tI5Mks.jpg", "Beetroot"), name: "Beetroot, *smoked cream,* rye", note: "Hand-cut beetroot tartare, smoked crème fraîche, crisp rye." },
    { image: IMG("/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg", "Scallop"), name: "Scallop, *brown butter,* hazelnut", note: "Hand-dived scallops seared in foaming butter, toasted hazelnut, pea shoots." },
    { image: IMG("/images/wFVJgjcEiePHQhiB5xCxnSM4MaY.jpg", "Agnolotti"), name: "Agnolotti, *sage,* aged parmesan", note: "Pasta pinched by hand each afternoon, sage brown butter, 36-month parmesan." },
    { image: IMG("/images/WFhP1qAD77HhhoC7psJBDhWvL8.jpg", "Black cod"), name: "Black cod, *miso,* dashi", note: "Cod cured for three days in white miso, kombu dashi, charred leek." },
    { image: IMG("/images/0jWFXM40GaSdwPlXOgrsvR3OCUc.jpg", "Duck"), name: "Duck, *cherry,* charred endive", note: "Dry-aged duck breast, morello cherry jus, endive from the grill." },
    { image: IMG("/images/L5Wcqw1oK1gJbXxAj4GmEOaUhr8.jpg", "Chocolate"), name: "Chocolate, *blood orange,* cocoa nib", note: "Dark chocolate crémeux, blood orange, cocoa nib tuile." },
]

function renderName(name: string) {
    return name.split("*").map((part, i) =>
        i % 2 === 1 ? (
            <em key={i} style={{ fontStyle: "italic" }}>
                {part}
            </em>
        ) : (
            <span key={i}>{part}</span>
        )
    )
}

function wrapDeg(deg: number) {
    let d = ((deg + 180) % 360 + 360) % 360 - 180
    return d
}

interface PlateProps {
    theta: MotionValue<number>
    index: number
    step: number
    radius: number
    size: number
    image?: Img
    zoom: number
    front: number
    entrance: boolean
    reduced: boolean
}

function Plate({ theta, index, step, radius, size, image, zoom, front, entrance, reduced }: PlateProps) {
    const base = front + index * step
    const scale = useTransform(theta, (t) => {
        const dist = Math.abs(wrapDeg(index * step + t))
        return 1 + 0.26 * Math.max(0, 1 - dist / step)
    })
    const rad = (base * Math.PI) / 180
    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius
    return (
        <div
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: size,
                height: size,
                marginLeft: -size / 2 + x,
                marginTop: -size / 2 + y,
                transform: `rotate(${index * step}deg)`,
                pointerEvents: "none",
            }}
        >
            <motion.div
                initial={entrance && !reduced ? { scale: 1.12, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.12, duration: 1.1, ease: EASE }}
                style={{ width: "100%", height: "100%" }}
            >
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        scale,
                        boxShadow: "0 28px 48px rgba(0,0,0,0.5), 0 6px 14px rgba(0,0,0,0.35)",
                    }}
                >
                    {image?.src && (
                        <img
                            src={image.src}
                            srcSet={image.srcSet}
                            alt={image.alt ?? ""}
                            draggable={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transform: `scale(${zoom})`,
                                display: "block",
                                userSelect: "none",
                            }}
                        />
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}

function Toggle({ on, label, onToggle, bone, brass }: { on: boolean; label: string; onToggle: () => void; bone: string; brass: string }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={on}
            onClick={onToggle}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: bone,
                fontFamily: SANS,
                fontSize: 15,
            }}
        >
            <span
                style={{
                    width: 38,
                    height: 22,
                    borderRadius: 999,
                    background: on ? brass : "rgba(238,231,219,0.18)",
                    position: "relative",
                    transition: "background 0.4s cubic-bezier(.16,1,.3,1)",
                    flexShrink: 0,
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
                        background: bone,
                        transition: "left 0.4s cubic-bezier(.16,1,.3,1)",
                    }}
                />
            </span>
            <span style={{ whiteSpace: "nowrap" }}>{label}</span>
        </button>
    )
}

/**
 * Lazy Susan hero: a walnut table of plates that turns one course at a time.
 *
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
function LazySusanHero(props: LazySusanHeroProps) {
    const {
        courses = DEFAULT_COURSES,
        background = IMG("/images/3RbRnYj2OzMV4NmtWLvu0xKCEA.jpg", "Dark linen tablecloth"),
        table = IMG("/images/144TZyyk8nNjXYDCaPv3INaUxdM.png", "Round walnut table"),
        startCourse = 4,
        priceText = "₹5,500 per guest",
        buttonLabel = "Book the tasting menu",
        buttonLink = "/reservations",
        pairingLabel = "Wine pairing",
        hintLabel = "Drag the table to turn it",
        autoTurn = 4.8,
        idleDelay = 7,
        plateZoom = 1.08,
        ink = "#111214",
        bone = "#EEE7DB",
        dust = "#A9A398",
        brass = "#C9A56B",
        style,
    } = props

    const list = (courses && courses.length > 0 ? courses : DEFAULT_COURSES).map((c, i) => ({
        ...c,
        image: c.image && c.image.src ? c.image : DEFAULT_COURSES[i % DEFAULT_COURSES.length].image,
    }))
    const n = list.length
    const step = 360 / n
    const isStatic = useIsStaticRenderer()
    const reduced = !!useReducedMotion()

    const rootRef = useRef<HTMLDivElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const inView = useInView(rootRef)
    const [size, setSize] = useState({ w: 1440, h: 900 })
    const startIndex = Math.min(Math.max(1, Math.round(startCourse)), n) - 1
    const theta = useMotionValue(-startIndex * step)
    const [active, setActive] = useState(startIndex)
    const [entered, setEntered] = useState(false)
    const [pairing, setPairing] = useState("wine")

    const phys = useRef({
        mode: "idle" as "idle" | "drag" | "coast" | "spring",
        v: 0,
        target: -startIndex * step,
        lastAngle: 0,
        lastMove: 0,
        downX: 0,
        downY: 0,
        moved: false,
        lastInput: 0,
        lastAuto: 0,
        lockUntil: 0,
        raf: 0,
    })

    useEffect(() => {
        const el = rootRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver((entries) => {
            const r = entries[0].contentRect
            if (r.width > 0 && r.height > 0) startTransition(() => setSize({ w: r.width, h: r.height }))
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        const t = window.setTimeout(() => startTransition(() => setEntered(true)), 2600)
        return () => window.clearTimeout(t)
    }, [])

    useEffect(() => {
        startTransition(() => setPairing(readPairing()))
        const h = (e: Event) => startTransition(() => setPairing((e as CustomEvent).detail))
        window.addEventListener(PAIRING_EVENT, h)
        return () => window.removeEventListener(PAIRING_EVENT, h)
    }, [])

    useEffect(() => {
        return theta.on("change", (t) => {
            const idx = (((Math.round(-t / step) % n) + n) % n)
            setActive((prev) => (prev === idx ? prev : idx))
        })
    }, [theta, step, n])

    const tick = useCallback(
        (now: number) => {
            const p = phys.current
            const dt = Math.min(0.032, Math.max(0.001, (now - (p.lastMove || now)) / 1000))
            p.lastMove = now
            let t = theta.get()
            if (p.mode === "coast") {
                p.v *= Math.pow(0.93, dt * 60)
                t += p.v * dt
                if (Math.abs(p.v) < 25) {
                    p.mode = "spring"
                    p.target = Math.round(t / step) * step
                }
            } else if (p.mode === "spring") {
                const a = -120 * (t - p.target) - 18 * p.v
                p.v += a * dt
                t += p.v * dt
                if (Math.abs(t - p.target) < 0.05 && Math.abs(p.v) < 0.5) {
                    t = p.target
                    p.mode = "idle"
                    p.v = 0
                }
            }
            theta.set(t)
            if (p.mode === "coast" || p.mode === "spring") {
                p.raf = requestAnimationFrame(tick)
            } else {
                p.raf = 0
            }
        },
        [theta, step]
    )

    const run = useCallback(() => {
        const p = phys.current
        if (!p.raf) {
            p.lastMove = performance.now()
            p.raf = requestAnimationFrame(tick)
        }
    }, [tick])

    useEffect(() => () => cancelAnimationFrame(phys.current.raf), [])

    const goBy = useCallback(
        (dir: number) => {
            const p = phys.current
            const base = p.mode === "spring" ? p.target : Math.round(theta.get() / step) * step
            p.target = base - dir * step
            if (reduced) {
                theta.set(p.target)
                p.mode = "idle"
                return
            }
            p.mode = "spring"
            run()
        },
        [theta, step, run, reduced]
    )

    // Idle auto-turn
    useEffect(() => {
        if (isStatic || reduced || !inView || autoTurn <= 0) return
        const id = window.setInterval(() => {
            const p = phys.current
            const now = performance.now()
            if (p.mode !== "idle") return
            if (now - p.lastInput < idleDelay * 1000) return
            if (now - p.lastAuto < autoTurn * 1000) return
            p.lastAuto = now
            goBy(1)
        }, 250)
        return () => window.clearInterval(id)
    }, [isStatic, reduced, inView, autoTurn, idleDelay, goBy])

    useEffect(() => {
        phys.current.lastInput = performance.now()
        phys.current.lastAuto = performance.now()
    }, [])

    const pointerAngle = (x: number, y: number) => {
        const el = tableRef.current
        if (!el) return 0
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        return (Math.atan2(y - cy, x - cx) * 180) / Math.PI
    }

    const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (isStatic) return
        const p = phys.current
        cancelAnimationFrame(p.raf)
        p.raf = 0
        p.mode = "drag"
        p.v = 0
        p.lastAngle = pointerAngle(e.clientX, e.clientY)
        p.lastMove = performance.now()
        p.downX = e.clientX
        p.downY = e.clientY
        p.moved = false
        p.lastInput = performance.now()
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const p = phys.current
        if (p.mode !== "drag") return
        const a = pointerAngle(e.clientX, e.clientY)
        const d = wrapDeg(a - p.lastAngle)
        const now = performance.now()
        const dt = Math.max(0.008, (now - p.lastMove) / 1000)
        p.lastAngle = a
        p.lastMove = now
        if (Math.hypot(e.clientX - p.downX, e.clientY - p.downY) > 6) p.moved = true
        theta.set(theta.get() + d)
        p.v = p.v * 0.6 + (d / dt) * 0.4
        p.lastInput = now
    }

    const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
        const p = phys.current
        if (p.mode !== "drag") return
        try {
            e.currentTarget.releasePointerCapture(e.pointerId)
        } catch {}
        p.lastInput = performance.now()
        if (!p.moved) {
            p.mode = "idle"
            goBy(1)
            return
        }
        if (reduced) {
            p.mode = "idle"
            theta.set(Math.round(theta.get() / step) * step)
            return
        }
        p.v = Math.max(-900, Math.min(900, p.v))
        p.mode = "coast"
        run()
    }

    const onKeyDown = (e: ReactKeyboardEvent) => {
        const p = phys.current
        const now = performance.now()
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
        e.preventDefault()
        if (now < p.lockUntil) return
        p.lockUntil = now + 420
        p.lastInput = now
        goBy(e.key === "ArrowRight" ? 1 : -1)
    }

    const onWheel = (e: ReactWheelEvent) => {
        const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2
        if (!horizontal && !e.shiftKey) return
        const delta = horizontal ? e.deltaX : e.deltaY
        if (Math.abs(delta) < 4) return
        const p = phys.current
        const now = performance.now()
        p.lastInput = now
        if (now < p.lockUntil) return
        p.lockUntil = now + 420
        goBy(delta > 0 ? 1 : -1)
    }

    // Geometry
    const { w, h } = size
    const mobile = w < 1000
    // Match the page gutters: 32px on tablet, 20px on phone
    const gutter = w >= 810 ? 32 : 20
    let D: number, cx: number, cy: number, R: number, plate: number, front: number
    if (mobile) {
        const s = Math.min(w, h * 0.5)
        D = 1.96 * s
        R = 0.646 * s
        plate = 0.4257 * s
        cx = w / 2
        cy = h - 0.133 * s
        front = 270
    } else {
        D = 1.4 * h
        R = 0.4656 * h
        plate = 0.3064 * h
        cx = Math.max(w - 0.1745 * h, 660 + R + 0.65 * plate)
        cy = 0.54 * h
        front = 180
    }
    const entrance = !isStatic && !entered

    const course = list[active] ?? list[0]
    const titleSize = mobile ? 44 : Math.max(54, Math.min(76, w * 0.053))
    const copyTransition = reduced
        ? { duration: 0.3 }
        : { duration: 0.9, ease: EASE }

    const appear = (delay: number, y = 0, blur = 0) =>
        entrance && !reduced
            ? {
                  initial: { opacity: 0, y, filter: `blur(${blur}px)` },
                  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                  transition: { delay, duration: 1.2, ease: EASE },
              }
            : {}

    const wine = pairing !== "soft"

    return (
        <div
            ref={rootRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Tonight's courses"
            onKeyDown={onKeyDown}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: ink,
                outline: "none",
                fontFamily: SANS,
                color: bone,
            }}
        >
            <link rel="stylesheet" href={FONT_HREF} />
            <motion.img
                src={background?.src}
                srcSet={background?.srcSet}
                alt=""
                initial={entrance && !reduced ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: mobile
                        ? "linear-gradient(180deg, rgba(10,10,13,0.55) 0%, rgba(10,10,13,0.15) 45%, rgba(10,10,13,0) 100%)"
                        : "radial-gradient(ellipse at 50% 50%, rgba(8,8,10,0) 35%, rgba(8,8,10,0.55) 100%), linear-gradient(90deg, rgba(10,10,13,0.45) 0%, rgba(10,10,13,0) 55%)",
                    pointerEvents: "none",
                }}
            />

            {/* Table */}
            <motion.div
                initial={entrance && !reduced ? { x: mobile ? 0 : "22%", y: mobile ? "16%" : 0, rotate: -35, opacity: 0 } : false}
                animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 2.4, ease: EASE }}
                style={{ position: "absolute", left: cx - D / 2, top: cy - D / 2, width: D, height: D }}
            >
                <div
                    ref={tableRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    onWheel={onWheel}
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        cursor: "grab",
                        touchAction: mobile ? "pan-y" : "none",
                    }}
                >
                    <motion.div style={{ position: "absolute", inset: 0, rotate: theta }}>
                        <img
                            src={table?.src}
                            srcSet={table?.srcSet}
                            alt={table?.alt ?? ""}
                            draggable={false}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                                boxShadow: "0 60px 120px rgba(0,0,0,0.6)",
                                userSelect: "none",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle at 38% 34%, rgba(255,226,180,0.16) 0%, rgba(255,226,180,0) 45%), radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.35) 100%)",
                            }}
                        />
                        {list.map((c, i) => (
                            <Plate
                                key={i}
                                theta={theta}
                                index={i}
                                step={step}
                                radius={R}
                                size={plate}
                                image={c.image}
                                zoom={plateZoom}
                                front={front}
                                entrance={entrance}
                                reduced={reduced}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Copy */}
            <div
                style={{
                    position: "absolute",
                    left: mobile ? gutter : Math.max(40, w * 0.0507),
                    right: mobile ? gutter : "auto",
                    top: mobile ? 96 : "50%",
                    transform: mobile ? "none" : "translateY(-50%)",
                    width: mobile ? "auto" : Math.min(560, w * 0.42),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: mobile ? 12 : 22,
                    pointerEvents: "none",
                }}
            >
                <motion.div {...appear(1.4)} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, color: dust, fontVariantNumeric: "tabular-nums" }}>
                        Course {active + 1} of {n}
                    </span>
                    <span style={{ display: "flex", gap: mobile ? 4 : 5 }}>
                        {list.map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    width: 18,
                                    height: 2,
                                    borderRadius: 2,
                                    background: i <= active ? bone : "rgba(238,231,219,0.25)",
                                    transition: "background 0.6s cubic-bezier(.16,1,.3,1)",
                                }}
                            />
                        ))}
                    </span>
                </motion.div>
                <motion.div {...appear(1.5, 24, 10)} style={{ width: "100%" }}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.h1
                            key={active}
                            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, filter: "blur(8px)", transition: { duration: 0.45, ease: EASE } }}
                            transition={copyTransition}
                            style={{
                                margin: 0,
                                fontFamily: SERIF,
                                fontWeight: 400,
                                fontSize: titleSize,
                                lineHeight: 0.98,
                                letterSpacing: "-0.02em",
                                color: bone,
                                fontVariationSettings: undefined,
                            }}
                        >
                            {renderName(course.name)}
                        </motion.h1>
                    </AnimatePresence>
                </motion.div>
                <motion.div {...appear(1.8)} style={{ width: "100%" }}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={active}
                            initial={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", transition: { duration: 0.45, ease: EASE } }}
                            transition={copyTransition}
                            style={{
                                margin: 0,
                                maxWidth: 400,
                                fontSize: mobile ? 15 : 17,
                                lineHeight: 1.55,
                                color: bone,
                                minHeight: mobile ? 46 : 53,
                            }}
                        >
                            {course.note}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>
                <motion.div
                    {...appear(2.0)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: mobile ? 14 : 18,
                        marginTop: mobile ? 4 : 8,
                        pointerEvents: "auto",
                    }}
                >
                    <Toggle
                        on={wine}
                        label={pairingLabel}
                        bone={bone}
                        brass={brass}
                        onToggle={() => writePairing(wine ? "soft" : "wine")}
                    />
                    <a
                        href={buttonLink}
                        className="palazzo-hero-btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "14px 22px",
                            borderRadius: 999,
                            border: `1px solid ${bone}`,
                            color: bone,
                            fontSize: 15,
                            fontWeight: 500,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            transition: "background 0.5s cubic-bezier(.16,1,.3,1), color 0.5s cubic-bezier(.16,1,.3,1)",
                        }}
                    >
                        {buttonLabel}
                    </a>
                    {!mobile && <span style={{ fontSize: 15, color: dust, whiteSpace: "nowrap" }}>{priceText}</span>}
                </motion.div>
            </div>

            {/* Hint */}
            <motion.div
                {...appear(2.2)}
                style={{
                    position: "absolute",
                    bottom: mobile ? 28 : 24,
                    left: mobile ? "50%" : 40,
                    x: mobile ? "-50%" : 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 14px 9px 10px",
                    borderRadius: 999,
                    border: `1px solid ${bone}`,
                    background: "rgba(17,18,20,0.55)",
                    backdropFilter: "blur(7px)",
                    WebkitBackdropFilter: "blur(7px)",
                    fontSize: 14,
                    color: bone,
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={bone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                </svg>
                {hintLabel}
            </motion.div>
            <style>{`.palazzo-hero-btn:hover{background:${bone};color:${ink} !important}`}</style>
        </div>
    )
}

addPropertyControls(LazySusanHero, {
    courses: {
        type: ControlType.Array,
        title: "Courses",
        control: {
            type: ControlType.Object,
            controls: {
                image: { type: ControlType.ResponsiveImage, title: "Plate" },
                name: { type: ControlType.String, title: "Name", defaultValue: "Scallop, *brown butter,* hazelnut", description: "Wrap words in *stars* to set them in italic." },
                note: { type: ControlType.String, title: "Note", displayTextArea: true, defaultValue: "Hand-dived scallops seared in foaming butter." },
            },
        },
        defaultValue: DEFAULT_COURSES.map((c) => ({ name: c.name, note: c.note })),
        maxCount: 12,
    },
    startCourse: { type: ControlType.Number, title: "Start course", defaultValue: 4, min: 1, max: 12, step: 1, displayStepper: true },
    background: { type: ControlType.ResponsiveImage, title: "Tablecloth" },
    table: { type: ControlType.ResponsiveImage, title: "Table top" },
    plateZoom: { type: ControlType.Number, title: "Plate size", defaultValue: 1.08, min: 1, max: 1.6, step: 0.01, description: "Zoom each photo until the rim touches the circle." },
    priceText: { type: ControlType.String, title: "Price", defaultValue: "₹5,500 per guest" },
    buttonLabel: { type: ControlType.String, title: "Button", defaultValue: "Book the tasting menu" },
    buttonLink: { type: ControlType.Link, title: "Button link", defaultValue: "/reservations" },
    pairingLabel: { type: ControlType.String, title: "Toggle", defaultValue: "Wine pairing" },
    hintLabel: { type: ControlType.String, title: "Hint", defaultValue: "Drag the table to turn it" },
    autoTurn: { type: ControlType.Number, title: "Auto-turn", defaultValue: 4.8, min: 0, max: 20, step: 0.1, unit: "s" },
    idleDelay: { type: ControlType.Number, title: "Idle delay", defaultValue: 7, min: 0, max: 30, step: 0.5, unit: "s" },
    ink: { type: ControlType.Color, title: "Ink", defaultValue: "#111214" },
    bone: { type: ControlType.Color, title: "Bone", defaultValue: "#EEE7DB" },
    dust: { type: ControlType.Color, title: "Dust", defaultValue: "#A9A398" },
    brass: { type: ControlType.Color, title: "Brass", defaultValue: "#C9A56B" },
})

export default withControls(LazySusanHero)
