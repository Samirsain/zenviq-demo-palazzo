import Link from "next/link"
import s from "./Button.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Bone" | "Outline" | "Glass" | "Ink"
    label?: string
    link?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function Button({ variant = "Bone", label, link, variantTablet, variantPhone, className }: Props) {
    return (
        <Link href={link ?? "#"} className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <div className={s.label}>
                <p>{label}</p>
            </div>
        </Link>
    )
}
