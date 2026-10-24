import Icon from "@/components/framer/Icon"
import s from "./Fact.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Default"
    label?: string
    icon?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function Fact({ variant = "Default", label, icon, variantTablet, variantPhone, className }: Props) {
    return (
        <div className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <Icon name={icon} className={s.icon} color="var(--brass)" strokeWidth={1.5} />
            <div className={s.label}>
                <p>{label}</p>
            </div>
        </div>
    )
}
