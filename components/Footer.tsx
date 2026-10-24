import NavLink from "@/components/framer/NavLink"
import s from "./Footer.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Desktop" | "Phone" | "Tablet"
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function Footer({ variant = "Desktop", variantTablet, variantPhone, className }: Props) {
    return (
        <footer className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <div className={s.inner}>
                <div className={s.columns}>
                    <div className={s.visit}>
                        <div className={s.text}>
                            <p>Visit</p>
                        </div>
                        <div className={s.text2}>
                            <p>14 Sardar Patel Marg</p>
                        </div>
                        <div className={s.text3}>
                            <p>C-Scheme, Jaipur 302001</p>
                        </div>
                        <NavLink href="mailto:hello@palazzojaipur.in" className={`${s.text4} nav-link`}>
                            <p>hello@palazzojaipur.in</p>
                        </NavLink>
                    </div>
                    <div className={s.hours}>
                        <div className={s.text5}>
                            <p>Hours</p>
                        </div>
                        <div className={s.text6}>
                            <p>Tuesday to Sunday</p>
                        </div>
                        <div className={s.text7}>
                            <p>Dinner from 7:00 pm</p>
                        </div>
                        <div className={s.text8}>
                            <p>Lunch Saturday and Sunday</p>
                        </div>
                    </div>
                    <div className={s.pages}>
                        <div className={s.text9}>
                            <p>Pages</p>
                        </div>
                        <NavLink href="/menu" className={`${s.text10} nav-link`}>
                            <p>Menu</p>
                        </NavLink>
                        <NavLink href="/the-room" className={`${s.text11} nav-link`}>
                            <p>The room</p>
                        </NavLink>
                        <NavLink href="/private-dining" className={`${s.text12} nav-link`}>
                            <p>Private dining</p>
                        </NavLink>
                        <NavLink href="/gift-cards" className={`${s.text13} nav-link`}>
                            <p>Gift cards</p>
                        </NavLink>
                        <NavLink href="/reservations" className={`${s.text14} nav-link`}>
                            <p>Reservations</p>
                        </NavLink>
                        <NavLink href="/read-me" className={`${s.text14} nav-link`}>
                            <p>About this demo</p>
                        </NavLink>
                    </div>
                    <div className={s.follow}>
                        <div className={s.text15}>
                            <p>Follow</p>
                        </div>
                        <NavLink href="https://instagram.com/" className={`${s.text16} nav-link`}>
                            <p>Instagram</p>
                        </NavLink>
                        <NavLink href="mailto:hello@palazzojaipur.in" className={`${s.text17} nav-link`}>
                            <p>Newsletter</p>
                        </NavLink>
                    </div>
                </div>
                <div className={`${s.wordmark} fr-autofit`} style={{ "--fit": 35.8 } as React.CSSProperties}>
                    <p>Palazzo</p>
                </div>
                <div className={s.bottomBar}>
                    <div className={s.text18}>
                        <p>{"© 2026 Palazzo, Jaipur. A demo website by "}<NavLink href="https://zenviqdigital.in/" className="nav-link">ZENVIQ Digital</NavLink>.</p>
                    </div>
                    <div className={s.text19}>
                        <p><NavLink href="/legal/privacy" className="nav-link">Privacy</NavLink>{" · "}<NavLink href="/legal/terms-of-booking" className="nav-link">Terms</NavLink>{" · "}<NavLink href="/legal/allergens" className="nav-link">Allergens</NavLink></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
