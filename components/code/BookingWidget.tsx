"use client"

import { addPropertyControls, ControlType, useIsStaticRenderer, withControls } from "@/lib/framer"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState, startTransition, type CSSProperties } from "react"

const FONT_HREF =
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500&display=swap"
const SERIF = `"Instrument Serif", Georgia, serif`
const SANS = `"Geist", system-ui, sans-serif`
const EASE = [0.16, 1, 0.3, 1] as const
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const WORDS = ["", "One guest", "Two guests", "Three guests", "Four guests", "Five guests", "Six guests"]

type Provider = "whatsapp" | "resy" | "tock" | "opentable" | "sevenrooms" | "email"

interface BookingWidgetProps {
    layout: "calendar" | "compact"
    provider: Provider
    venueUrl: string
    email: string
    openDays: string
    times: string
    fullTimes: string
    waitlistEvery: number
    daysAhead: number
    maxGuests: number
    defaultGuests: number
    price: string
    buttonLabel: string
    ink: string
    bone: string
    dust: string
    brass: string
    style?: CSSProperties
}

const PROVIDER_NAMES: Record<Provider, string> = {
    whatsapp: "WhatsApp",
    resy: "Resy",
    tock: "Tock",
    opentable: "OpenTable",
    sevenrooms: "SevenRooms",
    email: "email",
}

function ymd(d: Date) {
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${d.getFullYear()}-${m}-${day}`
}

// "19:30" -> "7:30 pm"; times stay 24h internally so string comparisons keep working
function ampm(t: string) {
    const [h, m] = t.split(":").map(Number)
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`
}

function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/**
 * Booking widget: guests, day, time, then hands off to the booking provider
 * chosen in the properties (Resy, Tock, OpenTable, SevenRooms or email).
 *
 * @framerIntrinsicWidth 560
 * @framerIntrinsicHeight 520
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
function BookingWidget(props: BookingWidgetProps) {
    const {
        layout = "calendar",
        provider = "whatsapp",
        venueUrl = "",
        email = "hello@palazzojaipur.in",
        openDays = "0,2,3,4,5,6",
        times = "19:00, 19:30, 20:00, 20:30, 21:00, 21:30",
        fullTimes = "20:30, 21:00",
        waitlistEvery = 5,
        daysAhead = 60,
        maxGuests = 6,
        defaultGuests = 2,
        price = "tasting menu ₹5,500 each",
        buttonLabel = layout === "compact" ? "Find a table" : "Reserve",
        ink = "#111214",
        bone = "#EEE7DB",
        dust = "#A9A398",
        brass = "#C9A56B",
        style,
    } = props

    const isStatic = useIsStaticRenderer()
    const reduced = useReducedMotion()
    const compact = layout === "compact"
    const rootRef = useRef<HTMLDivElement>(null)
    // Phone widths: tighter card padding and one even row of guest buttons
    const [narrow, setNarrow] = useState(false)
    useEffect(() => {
        const el = rootRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver((e) => setNarrow(e[0].contentRect.width < 420))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])
    const open = useMemo(
        () => openDays.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n)),
        [openDays]
    )
    const timeList = useMemo(() => times.split(",").map((s) => s.trim()).filter(Boolean), [times])
    const fullList = useMemo(() => fullTimes.split(",").map((s) => s.trim()).filter(Boolean), [fullTimes])

    // Fixed "today" on the canvas so the design stays stable
    const today = useMemo(() => {
        const d = isStatic ? new Date(2026, 9, 20) : new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [isStatic])

    const isOpen = (d: Date) => {
        if (d < today) return false
        const diff = (d.getTime() - today.getTime()) / 86400000
        if (diff > daysAhead) return false
        return open.includes(d.getDay())
    }
    const isWaitlist = (d: Date) => waitlistEvery > 0 && (d.getDate() * 7 + d.getMonth()) % waitlistEvery === 0

    const firstOpen = useMemo(() => {
        const d = new Date(today)
        for (let i = 0; i < 14; i++) {
            if (open.includes(d.getDay())) return new Date(d)
            d.setDate(d.getDate() + 1)
        }
        return new Date(today)
    }, [today, open])

    const [guests, setGuests] = useState(defaultGuests)
    const [day, setDay] = useState<Date>(() => {
        const d = new Date(firstOpen)
        d.setDate(d.getDate() + 1)
        return isOpen(d) ? d : firstOpen
    })
    const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
    const [time, setTime] = useState(() => timeList.find((t) => !fullList.includes(t) && t >= "19:00") ?? timeList[0])

    useEffect(() => {
        startTransition(() => setDay((d) => (isOpen(d) ? d : firstOpen)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstOpen])

    const nextDays = useMemo(() => {
        const out: Date[] = []
        const d = new Date(today)
        while (out.length < 6 && out.length < 60) {
            if (isOpen(d)) out.push(new Date(d))
            d.setDate(d.getDate() + 1)
            if ((d.getTime() - today.getTime()) / 86400000 > daysAhead) break
        }
        return out
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today, open, daysAhead])

    const fullForDay = (d: Date) => {
        // Busier at the end of the week
        if (d.getDay() === 5 || d.getDay() === 6) return fullList.concat(timeList.slice(1, 2))
        return fullList
    }
    const dayFull = fullForDay(day)

    const href = useMemo(() => {
        const date = ymd(day)
        const g = guests
        const base = venueUrl.replace(/\/$/, "")
        switch (provider) {
            case "resy":
                return `${base}?date=${date}&seats=${g}`
            case "tock":
                return `${base}/search?date=${date}&size=${g}&time=${encodeURIComponent(time)}`
            case "opentable":
                return `${base}${base.includes("?") ? "&" : "?"}covers=${g}&dateTime=${date}T${encodeURIComponent(time)}`
            case "sevenrooms":
                return `${base}?date=${date}&party_size=${g}&start_time=${encodeURIComponent(time)}`
            default: {
                const subject = `Table for ${g} on ${DAY_LONG[day.getDay()]} ${day.getDate()} ${MONTHS[day.getMonth()]} at ${ampm(time)}`
                const body = `Hello,\n\nWe would like a table for ${g} on ${DAY_LONG[day.getDay()]} ${day.getDate()} ${MONTHS[day.getMonth()]} at ${ampm(time)}.\n\nName:\nPhone:\nAllergies or occasions:\n`
                // Venue link holds the WhatsApp number; left empty, WhatsApp asks which chat to send it to
                if (provider === "whatsapp") return `https://wa.me/${venueUrl.replace(/\D/g, "")}?text=${encodeURIComponent(body)}`
                return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            }
        }
    }, [provider, venueUrl, email, day, guests, time])

    const largeParty = guests > maxGuests
    const finalHref = largeParty
        ? `mailto:${email}?subject=${encodeURIComponent(`A table for ${maxGuests + 1} or more`)}`
        : href

    const chip = (selected: boolean, disabled = false): CSSProperties => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minWidth: compact ? 44 : 46,
        padding: compact ? "10px 16px" : "10px 14px",
        borderRadius: 12,
        border: `1px solid ${disabled ? "rgba(238,231,219,0.35)" : bone}`,
        background: selected ? bone : "transparent",
        color: selected ? ink : disabled ? "rgba(238,231,219,0.45)" : bone,
        fontFamily: SANS,
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.2,
        cursor: disabled ? "default" : "pointer",
        transition: "background 0.4s cubic-bezier(.16,1,.3,1), color 0.4s cubic-bezier(.16,1,.3,1)",
        textDecoration: disabled ? "line-through" : "none",
    })

    const guestChip = (selected: boolean): CSSProperties => (narrow ? { ...chip(selected), minWidth: 0, padding: "10px 0" } : chip(selected))

    const label: CSSProperties = { fontFamily: SANS, fontSize: 14, fontWeight: 500, color: bone, margin: 0 }

    const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1)

    // Calendar grid
    const cells = useMemo(() => {
        const first = new Date(month)
        const offset = (first.getDay() + 6) % 7 // Monday first
        const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
        const out: (Date | null)[] = []
        for (let i = 0; i < offset; i++) out.push(null)
        for (let d = 1; d <= daysIn; d++) out.push(new Date(month.getFullYear(), month.getMonth(), d))
        return out
    }, [month])

    const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1)
    const lastMonth = new Date(today.getTime() + daysAhead * 86400000)
    const canNext = month < new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)

    const timeKey = ymd(day)
    const summaryDate = `${DAY_LONG[day.getDay()]} ${day.getDate()} ${MONTHS[day.getMonth()]}`

    return (
        <div
            ref={rootRef}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: compact ? 26 : 24,
                padding: narrow ? 20 : compact ? 32 : 28,
                borderRadius: 20,
                border: `1px solid ${bone}`,
                background: "rgba(17,18,20,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: bone,
                fontFamily: SANS,
            }}
        >
            <link rel="stylesheet" href={FONT_HREF} />

            {/* Guests */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={label}>Guests</p>
                <div
                    style={
                        narrow
                            ? { display: "grid", gridTemplateColumns: `repeat(${guestOptions.length + (compact ? 0 : 1)}, minmax(0, 1fr))`, gap: 6 }
                            : { display: "flex", flexWrap: "wrap", gap: 8 }
                    }
                    role="radiogroup"
                    aria-label="Guests"
                >
                    {guestOptions.map((g) => {
                        const text = g === maxGuests && compact ? `${g}+` : String(g)
                        return (
                            <button key={g} type="button" role="radio" aria-checked={guests === g} onClick={() => setGuests(g)} style={guestChip(guests === g)}>
                                {text}
                            </button>
                        )
                    })}
                    {!compact && (
                        <button type="button" role="radio" aria-checked={guests > maxGuests} onClick={() => setGuests(maxGuests + 1)} style={guestChip(guests > maxGuests)}>
                            {maxGuests + 1}+
                        </button>
                    )}
                </div>
            </div>

            {/* Date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={label}>Date</p>
                {compact ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {nextDays.map((d) => {
                            const sel = sameDay(d, day)
                            return (
                                <button key={ymd(d)} type="button" aria-pressed={sel} onClick={() => setDay(d)} style={chip(sel)}>
                                    <span style={{ fontSize: 12, fontWeight: 400 }}>{DAY_SHORT[d.getDay()]}</span>
                                    <span>{d.getDate()}</span>
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontFamily: SERIF, fontSize: 22 }}>
                                {MONTHS[month.getMonth()]} {month.getFullYear()}
                            </span>
                            <span style={{ display: "flex", gap: 6 }}>
                                {[-1, 1].map((dir) => {
                                    const enabled = dir < 0 ? canPrev : canNext
                                    return (
                                        <button
                                            key={dir}
                                            type="button"
                                            aria-label={dir < 0 ? "Previous month" : "Next month"}
                                            disabled={!enabled}
                                            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + dir, 1))}
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 999,
                                                border: "none",
                                                background: "transparent",
                                                color: bone,
                                                opacity: enabled ? 1 : 0.3,
                                                cursor: enabled ? "pointer" : "default",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={bone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d={dir < 0 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
                                            </svg>
                                        </button>
                                    )
                                })}
                            </span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                                <span key={d} style={{ fontSize: 11, color: dust, textAlign: "center" }}>
                                    {d}
                                </span>
                            ))}
                            {cells.map((d, i) => {
                                if (!d) return <span key={`e${i}`} />
                                const avail = isOpen(d)
                                const sel = sameDay(d, day)
                                const wait = avail && isWaitlist(d)
                                return (
                                    <button
                                        key={ymd(d)}
                                        type="button"
                                        disabled={!avail}
                                        aria-pressed={sel}
                                        aria-label={`${DAY_LONG[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}${wait ? ", waitlist only" : ""}`}
                                        onClick={() => setDay(d)}
                                        style={{
                                            height: 40,
                                            borderRadius: 10,
                                            border: avail ? `1px solid ${sel ? bone : "rgba(238,231,219,0.6)"}` : "1px solid transparent",
                                            background: sel ? bone : "transparent",
                                            color: sel ? ink : avail ? bone : "rgba(238,231,219,0.55)",
                                            fontFamily: SANS,
                                            fontSize: 13,
                                            cursor: avail ? "pointer" : "default",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 2,
                                            transition: "background 0.4s cubic-bezier(.16,1,.3,1)",
                                        }}
                                    >
                                        <span>{d.getDate()}</span>
                                        {avail && (
                                            <span style={{ width: 4, height: 4, borderRadius: 4, background: sel ? ink : wait ? bone : brass }} />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: 11, color: dust }}>
                            {[
                                [brass, "Tables free"],
                                [bone, "Waitlist only"],
                                [dust, "Closed"],
                            ].map(([c, t]) => (
                                <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: 5, background: c }} />
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Time */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={label}>Time</p>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={timeKey}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                    >
                        {timeList.map((t) => {
                            const full = dayFull.includes(t)
                            const sel = !full && t === time
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    disabled={full}
                                    aria-pressed={sel}
                                    aria-label={full ? `${ampm(t)}, full` : ampm(t)}
                                    onClick={() => setTime(t)}
                                    style={chip(sel, full)}
                                >
                                    {/* every slot is an evening one; the summary below spells out "pm" */}
                                    {ampm(t).slice(0, -3)}
                                </button>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {compact ? (
                <>
                    <a
                        href={finalHref}
                        target={provider === "email" || largeParty ? undefined : "_blank"}
                        rel="noopener"
                        className="palazzo-book-btn"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "14px 22px",
                            borderRadius: 999,
                            background: bone,
                            color: ink,
                            fontSize: 15,
                            fontWeight: 500,
                            textDecoration: "none",
                        }}
                    >
                        {buttonLabel}
                    </a>
                    <p style={{ margin: 0, fontSize: 13, color: dust, lineHeight: 1.4 }}>
                        {largeParty
                            ? `For ${maxGuests + 1} or more, write to us and we will set the Cellar Room.`
                            : `${WORDS[guests] ? WORDS[guests].replace(" guests", " seats").replace(" guest", " seat") : `${guests} seats`} at ${ampm(time)} on ${summaryDate}. Reservations through ${PROVIDER_NAMES[provider]}.`}
                    </p>
                </>
            ) : (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        borderTop: `1px solid ${bone}`,
                        paddingTop: 20,
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontFamily: SERIF, fontSize: 22, lineHeight: 1.2 }}>
                            {summaryDate}, {ampm(time)}
                        </span>
                        <span style={{ fontSize: 13, color: dust }}>
                            {largeParty ? "Large parties: we reply within a day" : `${WORDS[guests] ?? `${guests} guests`} · ${price}`}
                        </span>
                    </div>
                    <a
                        href={finalHref}
                        target={provider === "email" || largeParty ? undefined : "_blank"}
                        rel="noopener"
                        className="palazzo-book-btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
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
                        {largeParty ? "Write to us" : buttonLabel}
                    </a>
                </div>
            )}
            <style>{`.palazzo-book-btn{transition:background .5s cubic-bezier(.16,1,.3,1)}.palazzo-book-btn:hover{background:${brass} !important}`}</style>
        </div>
    )
}

addPropertyControls(BookingWidget, {
    layout: { type: ControlType.Enum, title: "Layout", options: ["calendar", "compact"], optionTitles: ["Calendar", "Compact"], defaultValue: "calendar", displaySegmentedControl: true },
    provider: {
        type: ControlType.Enum,
        title: "Bookings",
        options: ["whatsapp", "resy", "tock", "opentable", "sevenrooms", "email"],
        optionTitles: ["WhatsApp", "Resy", "Tock", "OpenTable", "SevenRooms", "Email"],
        defaultValue: "whatsapp",
    },
    venueUrl: { type: ControlType.String, title: "Venue link", defaultValue: "", hidden: (p: any) => p.provider === "email" },
    email: { type: ControlType.String, title: "Email", defaultValue: "hello@palazzojaipur.in" },
    openDays: { type: ControlType.String, title: "Open days", defaultValue: "0,2,3,4,5,6", description: "0 = Sunday … 6 = Saturday" },
    times: { type: ControlType.String, title: "Times", defaultValue: "19:00, 19:30, 20:00, 20:30, 21:00, 21:30" },
    fullTimes: { type: ControlType.String, title: "Full times", defaultValue: "20:30, 21:00" },
    waitlistEvery: { type: ControlType.Number, title: "Waitlist days", defaultValue: 5, min: 0, max: 20, step: 1, description: "Marks some days as waitlist only. 0 turns it off." },
    daysAhead: { type: ControlType.Number, title: "Days ahead", defaultValue: 60, min: 7, max: 365, step: 1 },
    maxGuests: { type: ControlType.Number, title: "Max guests", defaultValue: 6, min: 2, max: 20, step: 1 },
    defaultGuests: { type: ControlType.Number, title: "Default guests", defaultValue: 2, min: 1, max: 20, step: 1 },
    price: { type: ControlType.String, title: "Price note", defaultValue: "tasting menu ₹5,500 each" },
    buttonLabel: { type: ControlType.String, title: "Button", defaultValue: "Reserve" },
    ink: { type: ControlType.Color, title: "Ink", defaultValue: "#111214" },
    bone: { type: ControlType.Color, title: "Bone", defaultValue: "#EEE7DB" },
    dust: { type: ControlType.Color, title: "Dust", defaultValue: "#A9A398" },
    brass: { type: ControlType.Color, title: "Brass", defaultValue: "#C9A56B" },
})

export default withControls(BookingWidget)
