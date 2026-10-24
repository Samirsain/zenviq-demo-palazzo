import Link from "next/link"
import s from "./Pill.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Outline" | "Filled"
    label?: string
    link?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function Pill({ variant = "Outline", label, link, variantTablet, variantPhone, className }: Props) {
    return (
        <Link href={link ?? "#"} className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <div className={s.label}>
                <p>{label}</p>
            </div>
        </Link>
    )
}
