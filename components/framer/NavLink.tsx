"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"

// Link that marks the current page, for the "Nav Link" style (brass when active).
export default function NavLink(props: ComponentProps<typeof Link>) {
    const pathname = usePathname()
    return <Link {...props} aria-current={pathname === props.href ? "page" : undefined} />
}
