"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"

const FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&display=swap"
const SERIF = `"Instrument Serif", Georgia, serif`
const SANS = `"Geist", system-ui, sans-serif`
const EASE = [0.16, 1, 0.3, 1] as const

type Design = "walnut" | "linen" | "night"

interface Img {
    src: string
    srcSet?: string
    alt?: string
}

interface GiftCardBuilderProps {
    brand: string
    walnut?: Img
    stage?: Img
    amounts: string
    defaultAmount: number
    postFee: number
    checkout: "email" | "link"
    checkoutLink: string
    email: string
    ink: string
    ink2: string
    bone: string
    dust: string
    brass: string
    style?: CSSProperties
}

const DESIGNS: { id: Design; label: string }[] = [
    { id: "walnut", label: "Walnut" },
    { id: "linen", label: "Linen" },
    { id: "night", label: "Night" },
]

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

function cardTitle(amount: number) {
    if (amount >= 18000) return ["A tasting dinner for two", "With wine pairing"]
    if (amount >= 9000) return ["A tasting dinner", "For one, with wine"]
    if (amount >= 5500) return ["A tasting dinner", "For one"]
    return ["Dinner at the counter", "Valid for twelve months"]
}

function Card({ design, amount, brand, walnut, brass, bone, ink }: { design: Design; amount: number; brand: string; walnut?: Img; brass: string; bone: string; ink: string }) {
    const [title, sub] = cardTitle(amount)
    const light = design === "linen"
    const text = light ? ink : bone
    const bg =
        design === "walnut"
            ? "#2a1d14"
            : design === "linen"
              ? "#e8e1d5"
              : "linear-gradient(135deg, #2b2c30 0%, #141517 55%, #1d1e22 100%)"
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "440 / 272",
                borderRadius: 16,
                border: `1px solid ${brass}`,
                background: bg,
                overflow: "hidden",
                boxShadow: "0 40px 60px rgba(0,0,0,0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "6.4% 7.3%",
                boxSizing: "border-box",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
            }}
        >
            {design === "walnut" && walnut?.src && (
                <img src={walnut.src} alt="" style={{ position: "absolute", left: "-16%", top: "-38%", width: "200%", height: "auto", pointerEvents: "none" }} />
            )}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: light
                        ? "linear-gradient(140deg, rgba(255,255,255,0.5) 7%, rgba(255,255,255,0) 43%, rgba(120,100,70,0.18) 79%)"
                        : "linear-gradient(140deg, rgba(255,229,191,0.14) 7%, rgba(255,229,191,0) 43%, rgba(0,0,0,0.3) 79%)",
                }}
            />
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(22px, 3.2vw, 40px)", color: light ? ink : brass, lineHeight: 1 }}>{brand}</span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: light ? "#7a6a52" : brass }}>No. 0142</span>
            </div>
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: text }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(16px, 1.6vw, 22px)" }}>{title}</span>
                    <span style={{ fontFamily: SANS, fontSize: 14 }}>{sub}</span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={amount}
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(6px)" }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ fontFamily: SERIF, fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                    >
                        {inr(amount)}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    )
}

/**
 * Gift card builder: choose a design, an amount and delivery. The preview
 * card flips and tilts toward the cursor.
 *
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 700
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
function GiftCardBuilder(props: GiftCardBuilderProps) {
    const {
        brand = "Palazzo",
        walnut = { src: "/images/144TZyyk8nNjXYDCaPv3INaUxdM.png", alt: "" },
        stage,
        amounts = "5000, 10000, 18000",
        defaultAmount = 18000,
        postFee = 150,
        checkout = "email",
        checkoutLink = "",
        email = "hello@palazzojaipur.in",
        ink = "#111214",
        ink2 = "#1A1B1E",
        bone = "#EEE7DB",
        dust = "#A9A398",
        brass = "#C9A56B",
        style,
    } = props
    const isStatic = useIsStaticRenderer()
    const reduced = useReducedMotion()
    const rootRef = useRef<HTMLDivElement>(null)
    const [narrow, setNarrow] = useState(false)
    const list = amounts
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0)
    const [design, setDesign] = useState<Design>("walnut")
    const [flip, setFlip] = useState(0)
    // Two faces: the new design is drawn on whichever face turns toward the viewer.
    const [faces, setFaces] = useState<[Design, Design]>(["walnut", "walnut"])
    const [amount, setAmount] = useState<number>(defaultAmount)
    const [custom, setCustom] = useState(false)
    const [customValue, setCustomValue] = useState("150")
    const [post, setPost] = useState(false)
    const [to, setTo] = useState("")
    const [from, setFrom] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const el = rootRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver((e) => setNarrow(e[0].contentRect.width < 820))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const value = custom ? Math.max(1000, parseInt(customValue, 10) || 0) : amount
    const total = value + (post ? postFee : 0)

    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const sx = useSpring(px, { stiffness: 120, damping: 18 })
    const sy = useSpring(py, { stiffness: 120, damping: 18 })
    const tiltY = useTransform(sx, [0, 1], [-10, 10])
    const tiltX = useTransform(sy, [0, 1], [10, -10])
    const sheenX = useTransform(sx, [0, 1], ["-30%", "130%"])

    const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        if (isStatic || reduced || e.pointerType === "touch") return
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
    }

    const chooseDesign = (d: Design) => {
        if (d === design) return
        const next = flip + 180
        const showBack = (next / 180) % 2 === 1
        setFaces((f) => (showBack ? [f[0], d] : [d, f[1]]))
        setDesign(d)
        setFlip(next)
    }

    const pill = (selected: boolean): CSSProperties => ({
        padding: "10px 16px",
        borderRadius: 999,
        border: `1px solid ${bone}`,
        background: selected ? bone : "transparent",
        color: selected ? ink : bone,
        fontFamily: SANS,
        fontSize: 14,
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.4s cubic-bezier(.16,1,.3,1), color 0.4s cubic-bezier(.16,1,.3,1)",
    })

    const input: CSSProperties = {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px 14px",
        borderRadius: 12,
        border: `1px solid ${bone}`,
        background: "transparent",
        color: bone,
        fontFamily: SANS,
        fontSize: 14,
        outline: "none",
    }

    const stepTitle = (n: number, t: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
                style={{
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    border: `1px solid ${brass}`,
                    color: brass,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: SANS,
                }}
            >
                {n}
            </span>
            <span style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.2 }}>{t}</span>
        </div>
    )

    const label: CSSProperties = { fontSize: 12, color: bone, marginBottom: 6, display: "block" }

    const buyHref = (() => {
        const d = DESIGNS.find((x) => x.id === design)?.label
        if (checkout === "link" && checkoutLink) return checkoutLink
        const subject = `Gift card · ${inr(total)}`
        const body = `Hello,\n\nI would like a ${d} gift card for ${inr(value)}${post ? `, couriered on cotton card (+${inr(postFee)})` : ", sent by email today"}.\n\nTo: ${to}\nFrom: ${from}\nMessage: ${message}\n`
        return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    })()

    return (
        <div
            ref={rootRef}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: narrow ? "column" : "row",
                alignItems: narrow ? "stretch" : "flex-start",
                gap: narrow ? 32 : 80,
                color: bone,
                fontFamily: SANS,
            }}
        >
            <link rel="stylesheet" href={FONT_HREF} />
            {/* Preview */}
            <div style={{ flex: narrow ? "none" : 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14, position: narrow ? "relative" : "sticky", top: narrow ? 0 : 120 }}>
                <div
                    onPointerMove={onMove}
                    onPointerLeave={() => {
                        px.set(0.5)
                        py.set(0.5)
                    }}
                    style={{
                        position: "relative",
                        aspectRatio: narrow ? "1 / 0.86" : "560 / 502",
                        borderRadius: 20,
                        border: `1px solid ${bone}`,
                        background: ink,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: 1000,
                    }}
                >
                    {stage?.src && (
                        <img src={stage.src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
                    )}
                    <motion.div style={{ width: "78%", rotateX: tiltX, rotateY: tiltY, rotate: -6, transformStyle: "preserve-3d" }}>
                        <motion.div
                            animate={{ rotateY: flip }}
                            transition={reduced ? { duration: 0 } : { duration: 1, ease: EASE }}
                            style={{ transformStyle: "preserve-3d", position: "relative" }}
                        >
                            <Card design={faces[0]} amount={value} brand={brand} walnut={walnut} brass={brass} bone={bone} ink={ink} />
                            <div style={{ position: "absolute", inset: 0, transform: "rotateY(180deg)", transformStyle: "preserve-3d", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                <Card design={faces[1]} amount={value} brand={brand} walnut={walnut} brass={brass} bone={bone} ink={ink} />
                            </div>
                            <motion.div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: 16,
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
                                        background: "linear-gradient(105deg, rgba(255,240,215,0) 0%, rgba(255,240,215,0.35) 50%, rgba(255,240,215,0) 100%)",
                                        mixBlendMode: "soft-light",
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
                <span style={{ fontSize: 13, color: dust, textAlign: "center" }}>Preview updates as you choose</span>
            </div>

            {/* Options */}
            <div style={{ flex: narrow ? "none" : 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 34 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {stepTitle(1, "Choose a card")}
                    <div style={{ display: "flex", gap: 12 }}>
                        {DESIGNS.map((d) => {
                            const sel = d.id === design
                            const bg = d.id === "walnut" ? "#3a2819" : d.id === "linen" ? "#e8e1d5" : "#17181b"
                            return (
                                <button
                                    key={d.id}
                                    type="button"
                                    aria-pressed={sel}
                                    onClick={() => chooseDesign(d.id)}
                                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", padding: 0, cursor: "pointer", color: dust, fontFamily: SANS, fontSize: 12 }}
                                >
                                    <span
                                        style={{
                                            width: narrow ? 92 : 104,
                                            height: narrow ? 58 : 64,
                                            borderRadius: 8,
                                            background: bg,
                                            border: `1px solid ${sel ? bone : "rgba(238,231,219,0.3)"}`,
                                            boxShadow: sel ? `0 0 0 3px ${ink}, 0 0 0 4px ${bone}` : "none",
                                            transition: "box-shadow 0.4s cubic-bezier(.16,1,.3,1)",
                                        }}
                                    />
                                    {d.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {stepTitle(2, "Amount")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {list.map((a) => (
                            <button
                                key={a}
                                type="button"
                                aria-pressed={!custom && amount === a}
                                onClick={() => {
                                    setCustom(false)
                                    setAmount(a)
                                }}
                                style={pill(!custom && amount === a)}
                            >
                                {inr(a)}
                                {a >= 18000 ? " · Tasting for two" : ""}
                            </button>
                        ))}
                        <button type="button" aria-pressed={custom} onClick={() => setCustom(true)} style={pill(custom)}>
                            Any amount
                        </button>
                    </div>
                    {custom && (
                        <label style={{ display: "flex", alignItems: "center", gap: 10, maxWidth: 220 }}>
                            <span style={{ fontSize: 14, color: dust }}>₹</span>
                            <input
                                inputMode="numeric"
                                value={customValue}
                                onChange={(e) => setCustomValue(e.target.value.replace(/[^0-9]/g, ""))}
                                aria-label="Amount in rupees"
                                style={input}
                            />
                        </label>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {stepTitle(3, "Delivery")}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        <button type="button" aria-pressed={!post} onClick={() => setPost(false)} style={pill(!post)}>
                            Email or WhatsApp, today
                        </button>
                        <button type="button" aria-pressed={post} onClick={() => setPost(true)} style={pill(post)}>
                            Cotton card by courier · + {inr(postFee)}
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: 12, flexDirection: narrow ? "column" : "row" }}>
                        <label style={{ flex: 1 }}>
                            <span style={label}>To</span>
                            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder={post ? "Their name and address" : "Their name and email"} style={input} />
                        </label>
                        <label style={{ flex: 1 }}>
                            <span style={label}>From</span>
                            <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name" style={input} />
                        </label>
                    </div>
                    <label>
                        <span style={label}>Message</span>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Happy birthday, Riya. Dinner is on us." style={input} />
                    </label>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${bone}`, paddingTop: 22 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ fontSize: 13, color: dust }}>Total</span>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={total}
                                initial={{ opacity: 0, filter: "blur(6px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(6px)" }}
                                transition={{ duration: 0.3, ease: EASE }}
                                style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                            >
                                {inr(total)}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <a
                        href={buyHref}
                        className="palazzo-gift-btn"
                        style={{
                            padding: "14px 22px",
                            borderRadius: 999,
                            background: bone,
                            color: ink,
                            fontSize: 15,
                            fontWeight: 500,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Buy gift card
                    </a>
                </div>
            </div>
            <style>{`.palazzo-gift-btn{transition:background .5s cubic-bezier(.16,1,.3,1)}.palazzo-gift-btn:hover{background:${brass} !important}input::placeholder{color:rgba(238,231,219,0.55)}`}</style>
        </div>
    )
}

addPropertyControls(GiftCardBuilder, {
    brand: { type: ControlType.String, title: "Brand", defaultValue: "Palazzo" },
    walnut: { type: ControlType.ResponsiveImage, title: "Walnut texture" },
    stage: { type: ControlType.ResponsiveImage, title: "Stage photo" },
    amounts: { type: ControlType.String, title: "Amounts", defaultValue: "5000, 10000, 18000" },
    defaultAmount: { type: ControlType.Number, title: "Default", defaultValue: 18000, min: 0, max: 100000, step: 1 },
    postFee: { type: ControlType.Number, title: "Post fee", defaultValue: 150, min: 0, max: 1000, step: 1 },
    checkout: { type: ControlType.Enum, title: "Checkout", options: ["email", "link"], optionTitles: ["Email order", "Payment link"], defaultValue: "email", displaySegmentedControl: true },
    checkoutLink: { type: ControlType.Link, title: "Payment link", hidden: (p: any) => p.checkout !== "link" },
    email: { type: ControlType.String, title: "Email", defaultValue: "hello@palazzojaipur.in" },
    ink: { type: ControlType.Color, title: "Ink", defaultValue: "#111214" },
    ink2: { type: ControlType.Color, title: "Ink 2", defaultValue: "#1A1B1E" },
    bone: { type: ControlType.Color, title: "Bone", defaultValue: "#EEE7DB" },
    dust: { type: ControlType.Color, title: "Dust", defaultValue: "#A9A398" },
    brass: { type: ControlType.Color, title: "Brass", defaultValue: "#C9A56B" },
})

export default withControls(GiftCardBuilder)
