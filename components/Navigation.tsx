"use client"

import NavLink from "@/components/framer/NavLink"
import Button from "@/components/Button"
import Icon from "@/components/framer/Icon"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import s from "./Navigation.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Desktop" | "Phone" | "Phone Open" | "Tablet"
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function Navigation({ variant = "Desktop", variantTablet, variantPhone, className }: Props) {
    const pathname = usePathname()
    const [tapped, setTapped] = useState<{ v: string | null; path: string }>({ v: null, path: pathname })
    const v = tapped.path === pathname ? tapped.v : null
    const cur = v ?? variant
    const order = ["Desktop","Phone","Phone Open","Tablet"]
    const go = (to: string) => setTapped({ v: to === "cycle" ? order[(order.indexOf(cur) + 1) % order.length] : to, path: pathname })
    return (
        <nav className={cx(s.root, className)} data-v={v ?? variant} data-v-tablet={v ? undefined : variantTablet} data-v-phone={v ? undefined : variantPhone}>
            <div className={s.bar}>
                <NavLink href="/" className={`${s.logo} nav-link`}>
                    <p>Palazzo</p>
                </NavLink>
                <div className={s.spacer} />
                <div className={s.links}>
                    <NavLink href="/menu" className={`${s.text} nav-link`}>
                        <p>Menu</p>
                    </NavLink>
                    <NavLink href="/the-room" className={`${s.text2} nav-link`}>
                        <p>The room</p>
                    </NavLink>
                    <NavLink href="/private-dining" className={`${s.text3} nav-link`}>
                        <p>Private dining</p>
                    </NavLink>
                    <NavLink href="/gift-cards" className={`${s.text4} nav-link`}>
                        <p>Gift cards</p>
                    </NavLink>
                </div>
                <Button className={s.button} variant="Bone" label={"Book a table"} link={"/reservations"} />
                <div className={s.menuButton} onClick={() => go(({"Desktop":"Phone Open","Phone":"Phone Open","Phone Open":"Phone","Tablet":"Phone Open"} as Record<string, string>)[cur] ?? "Phone Open")}>
                    <Icon name="Equal" className={s.icon} color="var(--bone)" strokeWidth={1.5} />
                </div>
            </div>
            <div className={s.drawer}>
                <Link href="/menu" className={s.menu}>
                    <div className={s.text5}>
                        <p>Menu</p>
                    </div>
                    <div className={s.thumb}>
                        <Image src="/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                </Link>
                <Link href="/the-room" className={s.theRoom}>
                    <div className={s.text6}>
                        <p>The room</p>
                    </div>
                </Link>
                <Link href="/private-dining" className={s.privateDining}>
                    <div className={s.text7}>
                        <p>Private dining</p>
                    </div>
                </Link>
                <Link href="/gift-cards" className={s.giftCards}>
                    <div className={s.text8}>
                        <p>Gift cards</p>
                    </div>
                </Link>
                <Link href="/reservations" className={s.reservations}>
                    <div className={s.text9}>
                        <p>Reservations</p>
                    </div>
                </Link>
                <div className={s.gap} />
                <Button className={s.button2} variant="Bone" label={"Book a table"} link={"/reservations"} />
                <div className={s.gap2} />
                <div className={s.text10}>
                    <p>14 Sardar Patel Marg, Jaipur · Dinner from 7:00 pm</p>
                </div>
                <div className={s.gap3} />
                <div className={s.plates}>
                    <div className={s.plate}>
                        <Image src="/images/wFVJgjcEiePHQhiB5xCxnSM4MaY.jpg" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                    <div className={s.plate2}>
                        <Image src="/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                    <div className={s.plate3}>
                        <Image src="/images/L5Wcqw1oK1gJbXxAj4GmEOaUhr8.jpg" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                </div>
            </div>
        </nav>
    )
}
