import Link from "next/link"
import type { ElementType } from "react"

type Run = { attributes?: { text?: string; italic?: boolean; link?: { href: string } } }
type Block = { attributes?: { tag?: string }; children?: Run[] }

// Renders CMS rich text (exported Framer text blocks), styling each tag with its text-style preset.
export default function RichText({ content, presets = {} }: { content?: Block[]; presets?: Record<string, string> }) {
    return (
        <div className="fr-rich">
            {(content ?? []).map((block, i) => {
                const tag = block.attributes?.tag ?? "p"
                const Tag = tag as ElementType
                return (
                    <Tag key={i} className={presets[tag]}>
                        {(block.children ?? []).map((run, j) => {
                            const { text = "", italic, link } = run.attributes ?? {}
                            const content = italic ? <em>{text}</em> : text
                            return link ? (
                                <Link key={j} href={link.href}>
                                    {content}
                                </Link>
                            ) : (
                                <span key={j}>{content}</span>
                            )
                        })}
                    </Tag>
                )
            })}
        </div>
    )
}
