import {
    BookOpen,
    Calendar,
    CircleAlert,
    CircleCheck,
    Clock,
    CreditCard,
    Egg,
    Equal,
    Feather,
    Fish,
    Key,
    Mail,
    MapPin,
    Milk,
    Minus,
    Nut,
    Plus,
    RotateCcw,
    Shrimp,
    Smile,
    Sparkle,
    Users,
    Wheat,
    X,
    type LucideIcon,
} from "lucide-react"

// Framer icon names (Lucide + Feather sets) -> lucide-react
const ICONS: Record<string, LucideIcon> = {
    "Rotate Ccw": RotateCcw,
    Minus,
    Plus,
    Equal,
    X,
    Sparkle,
    Wheat,
    Milk,
    Nut,
    Shrimp,
    Fish,
    Egg,
    "Map Pin": MapPin,
    Clock,
    "Alert Circle": CircleAlert,
    Feather,
    Smile,
    Mail,
    Calendar,
    "Check Circle": CircleCheck,
    Users,
    "Credit Card": CreditCard,
    "Book Open": BookOpen,
    Key,
}

type Props = { name?: string; color?: string; strokeWidth?: number; className?: string }

export default function Icon({ name, color = "currentColor", strokeWidth = 2, className }: Props) {
    const C = name ? ICONS[name] : undefined
    if (!C) return null
    return <C className={className} color={color} strokeWidth={strokeWidth} aria-hidden />
}
