import s from "./ZenviqBadge.module.css"

// Fixed corner credit: this site is a ZENVIQ Digital demo
export default function ZenviqBadge() {
    return (
        <a className={s.badge} href="https://zenviqdigital.in/" target="_blank" rel="noopener" aria-label="Demo website by ZENVIQ Digital. Get a website like this">
            <span>Demo by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/zenviq-logo.svg" alt="" width={46} height={14} />
            <span className={s.cta}>Get a website like this →</span>
        </a>
    )
}
