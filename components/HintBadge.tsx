import Icon from "@/components/framer/Icon"
import s from "./HintBadge.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Default"
    label?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function HintBadge({ variant = "Default", label, variantTablet, variantPhone, className }: Props) {
    return (
        <div className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <Icon name="Rotate Ccw" className={s.icon} color="var(--bone)" strokeWidth={1.5} />
            <div className={s.label}>
                <p>{label}</p>
            </div>
        </div>
    )
}
