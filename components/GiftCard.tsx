import Image from "next/image"
import s from "./GiftCard.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Walnut" | "Linen" | "Night"
    title?: string
    subtitle?: string
    price?: string
    number?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function GiftCard({ variant = "Walnut", title, subtitle, price, number, variantTablet, variantPhone, className }: Props) {
    return (
        <div className={cx(s.root, className)} data-v={variant} data-v-tablet={variantTablet} data-v-phone={variantPhone}>
            <div className={s.wood}>
                <Image src="/images/144TZyyk8nNjXYDCaPv3INaUxdM.png" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
            </div>
            <div className={s.sheen} />
            <div className={s.top}>
                <div className={s.text}>
                    <p>Palazzo</p>
                </div>
                <div className={s.text2}>
                    <p>{number}</p>
                </div>
            </div>
            <div className={s.bottom}>
                <div className={s.for}>
                    <div className={s.text3}>
                        <p>{title}</p>
                    </div>
                    <div className={s.text4}>
                        <p>{subtitle}</p>
                    </div>
                </div>
                <div className={s.text5}>
                    <p>{price}</p>
                </div>
            </div>
        </div>
    )
}
