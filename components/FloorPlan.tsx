"use client"

import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import s from "./FloorPlan.module.css"

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ")

type Props = {
    variant?: "One table" | "Two tables" | "Standing"
    showText?: boolean
    variantTablet?: string
    variantPhone?: string
    className?: string
}

export default function FloorPlan({ variant = "One table", showText = true, variantTablet, variantPhone, className }: Props) {
    const pathname = usePathname()
    const [tapped, setTapped] = useState<{ v: string | null; path: string }>({ v: null, path: pathname })
    const v = tapped.path === pathname ? tapped.v : null
    const cur = v ?? variant
    const order = ["One table","Two tables","Standing"]
    const go = (to: string) => setTapped({ v: to === "cycle" ? order[(order.indexOf(cur) + 1) % order.length] : to, path: pathname })
    return (
        <div className={cx(s.root, className)} data-v={v ?? variant} data-v-tablet={v ? undefined : variantTablet} data-v-phone={v ? undefined : variantPhone}>
            {showText && (
                <div className={s.text}>
                    <div className={`${s.text2} ts-heading-2`}>
                        <h2>{"One table, "}<em>or two</em></h2>
                    </div>
                    <div className={`${s.text3} ts-body-s`}>
                        <p>Seat everyone together, or split the table in two and start with a standing aperitif by the wine wall.</p>
                    </div>
                    <div className={s.layouts}>
                        <div className={s.oneTable14} onClick={() => go("One table")}>
                            <div className={s.text4}>
                                <p>One table · 14</p>
                            </div>
                        </div>
                        <div className={s.twoTables86} onClick={() => go("Two tables")}>
                            <div className={s.text5}>
                                <p>Two tables · 8 + 6</p>
                            </div>
                        </div>
                        <div className={s.standing24} onClick={() => go("Standing")}>
                            <div className={s.text6}>
                                <p>Standing · 24</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={s.plan}>
                <div className={s.room}>
                    <div className={s.wineWall} />
                    <div className={`${s.text7} ts-caption`}>
                        <p>Wine wall</p>
                    </div>
                    <div className={`${s.text8} ts-caption`}>
                        <p>Entrance · Bhagwan Das Road</p>
                    </div>
                    <div className={`${s.text9} ts-caption`}>
                        <p>Private pass</p>
                    </div>
                    <div className={s.door} />
                    <div className={s.table1}>
                        <Image src="/images/144TZyyk8nNjXYDCaPv3INaUxdM.png" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                    <div className={s.table2}>
                        <Image src="/images/144TZyyk8nNjXYDCaPv3INaUxdM.png" alt="" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    </div>
                    <div className={s.seat} />
                    <div className={s.seat2} />
                    <div className={s.seat3} />
                    <div className={s.seat4} />
                    <div className={s.seat5} />
                    <div className={s.seat6} />
                    <div className={s.seat7} />
                    <div className={s.seat8} />
                    <div className={s.seat9} />
                    <div className={s.seat10} />
                    <div className={s.seat11} />
                    <div className={s.seat12} />
                    <div className={s.seat13} />
                    <div className={s.seat14} />
                    <div className={s.seat15} />
                    <div className={s.seat16} />
                    <div className={s.seat17} />
                    <div className={s.seat18} />
                    <div className={s.seat19} />
                    <div className={s.seat20} />
                    <div className={s.seat21} />
                    <div className={s.seat22} />
                    <div className={s.seat23} />
                    <div className={s.seat24} />
                </div>
            </div>
        </div>
    )
}
