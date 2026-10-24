import { cms, sortBy } from "@/lib/cms"
import Link from "next/link"
import RichText from "@/components/framer/RichText"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import s from "./page.module.css"

export function generateStaticParams() {
    return cms.legal.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const item = cms.legal.find((x) => x.slug === slug)
    if (!item) return {}
    return { title: `${item.title} — Palazzo`, description: `${item.title} for Palazzo, an eight-course tasting menu restaurant on Sardar Patel Marg, Jaipur.` }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const item = cms.legal.find((x) => x.slug === slug)
    if (!item) notFound()
    return (
        <div className={s.page}>
            <div className={s.content}>
                <div className={s.inner}>
                    <div className={s.sidebar}>
                        <div className={`${s.text} ts-heading-2`}>
                            <h2>Legal</h2>
                        </div>
                        <div className={s.gap} />
                        <div className={s.documents}>
                            {sortBy(cms.legal, "order", "asc").map((item2, i) => (
                                <Link key={item2.id} href={`/legal/${item2.slug}`} className={s.document}>
                                    <div className={`${s.text2} ts-body-s`}>
                                        <p>{item2.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className={s.article}>
                        <div className={`${s.text3} ts-heading-page-title`}>
                            <p>{item.title}</p>
                        </div>
                        <div className={`${s.text4} ts-caption`} />
                        <div className={s.gap2} />
                        <div className={s.text5}>
                            <RichText content={item.body} presets={{"h1":"ts-display-page","h2":"ts-heading-2","h3":"ts-heading-card","h4":"ts-heading-5","h5":"ts-heading-6","p":"ts-body-m"}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
