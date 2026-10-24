"use client"

import Icon from "@/components/framer/Icon"
import { useState } from "react"
import { usePathname } from "next/navigation"
import s from "./FAQItem.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Open" | "Closed"
    question?: string
    answer?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function FAQItem({ variant = "Open", question, answer, variantTablet, variantPhone, className }: Props) {
    const pathname = usePathname()
    const [tapped, setTapped] = useState<{ v: string | null; path: string }>({ v: null, path: pathname })
    const v = tapped.path === pathname ? tapped.v : null
    const cur = v ?? variant
    const order = ["Open","Closed"]
    const go = (to: string) => setTapped({ v: to === "cycle" ? order[(order.indexOf(cur) + 1) % order.length] : to, path: pathname })
    return (
        <div className={cx(s.root, className)} onClick={() => go("cycle")} data-v={v ?? variant} data-v-tablet={v ? undefined : variantTablet} data-v-phone={v ? undefined : variantPhone}>
            <div className={s.row}>
                <div className={`${s.text} ts-heading-6`}>
                    <p>{question}</p>
                </div>
                <Icon name="Minus" className={s.icon} color="var(--bone)" strokeWidth={1.5} />
            </div>
            <div className={`${s.text2} ts-body-s`}>
                <p>{answer}</p>
            </div>
        </div>
    )
}
