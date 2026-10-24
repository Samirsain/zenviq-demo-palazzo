"use client"

import { useFormState } from "@/components/framer/Form"
import s from "./SubmitButton.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "Default" | "Pending" | "Success" | "Error"
    label?: string
    variantTablet?: string
    variantPhone?: string
    className?: string
    successVariant?: string
    pendingVariant?: string
    errorVariant?: string
}

export default function SubmitButton({ variant = "Default", label, variantTablet, variantPhone, className, successVariant, pendingVariant, errorVariant }: Props) {
    const state = useFormState()
    const formVariant = (state === "success" && successVariant) || (state === "pending" && pendingVariant) || (state === "error" && errorVariant) || variant
    return (
        <button className={cx(s.root, className)} data-v={formVariant} data-v-tablet={variantTablet} data-v-phone={variantPhone} type="submit">
            <div className={s.text}>
                <div className={s.textAlt0}>
                    <p>{label}</p>
                </div>
                <div className={s.textAlt1}>
                    <p>Thank you. We reply within a day.</p>
                </div>
                <div className={s.textAlt2}>
                    <p>Something went wrong. Please write to us.</p>
                </div>
            </div>
        </button>
    )
}
