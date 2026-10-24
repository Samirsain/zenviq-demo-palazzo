"use client"

import { createContext, useContext, useState, type FormEvent, type ReactNode } from "react"

type State = "idle" | "pending" | "success" | "error"

const FormState = createContext<State>("idle")
export const useFormState = () => useContext(FormState)

export default function Form({ className, children }: { className?: string; children?: ReactNode }) {
    const [state, setState] = useState<State>("idle")
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // ponytail: no backend yet; post the FormData to an API route or email service when one exists
        setState("success")
    }
    return (
        <FormState.Provider value={state}>
            <form className={className} onSubmit={onSubmit}>
                {children}
            </form>
        </FormState.Provider>
    )
}
