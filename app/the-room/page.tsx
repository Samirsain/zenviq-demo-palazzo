import Image from "next/image"
import Appear from "@/components/framer/Appear"
import Button from "@/components/Button"
import { cms } from "@/lib/cms"
import Icon from "@/components/framer/Icon"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    "title": "The Room — Our Story, Chef and Growers | Palazzo Jaipur",
    "description": "Twelve tables, a walnut counter and an open kitchen on Sardar Patel Marg, Jaipur. Chef Arjun Rathore has cooked here since 2014 with eleven farms, boats and growers."
}

export default function TheRoomPage() {
    return (
        <div className={s.page}>
            <div className={s.hero}>
                <Appear as="div" className={s.roomPhoto} enter={{"scale":1.12}} transition={{"ease":[0.16,1,0.3,1],"duration":2.4,"delay":0}}>
                    <Image src="/images/wK4dlSZIBdgY5Sa81cawjS4ZTc.jpg" alt="Palazzo dining room with white tablecloths and tall windows at dusk" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                </Appear>
                <div className={s.shade} />
                <div className={s.inner}>
                    <Appear as="div" className={`${s.text} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.35}}>
                        <h1>{"The "}<em>room</em></h1>
                    </Appear>
                    <Appear as="div" className={`${s.text2} ts-body-l`} enter={{"opacity":0,"y":12}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.8}}>
                        <p>Twelve tables, one walnut counter and a kitchen you can see from every seat.</p>
                    </Appear>
                </div>
            </div>
            <div className={s.story}>
                <div className={s.inner2}>
                    <div className={s.text3}>
                        <Appear as="div" className={`${s.text4} ts-heading-lead`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <p>{"Arjun opened Palazzo in 2014 with six tables and a menu written each morning. "}<em>It still is.</em></p>
                        </Appear>
                        <div className={`${s.text5} ts-body-m`}>
                            <p>He trained in Lyon and Tokyo, then came home to Jaipur to cook from a small circle of farms, boats and growers. The room has grown; the idea has not.</p>
                        </div>
                        <Button className={s.button} variant="Outline" label={"See the menu"} link={"/menu"} />
                    </div>
                    <div className={s.spacer} />
                    <div className={s.portrait}>
                        <Appear as="div" className={s.chef} enter={{"opacity":0,"scale":0.92}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0}}>
                            <Image src="/images/lMfBRKMerksDQOxhDpiD6WzQxA.png" alt="Chef Arjun Rathore at the pass in the Palazzo kitchen" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" style={{ objectPosition: "50% center" }} />
                        </Appear>
                        <div className={s.caption}>
                            <div className={`${s.text6} ts-heading-6`}>
                                <h5><em>Arjun Rathore</em></h5>
                            </div>
                            <div className={`${s.text7} ts-caption`}>
                                <p>Chef and owner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.since2014}>
                <div className={s.inner3}>
                    <Appear as="div" className={`${s.text8} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h2>{"Since "}<em>2014</em></h2>
                    </Appear>
                    <div className={s.timeline}>
                        <Appear as="div" className={s.n2014} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}}>
                            <div className={s.rule}>
                                <div className={s.dot} />
                                <div className={s.line} />
                            </div>
                            <div className={`${s.text9} ts-heading-4`}>
                                <h3>2014</h3>
                            </div>
                            <div className={`${s.text10} ts-caption`}>
                                <p>Six tables on Sardar Patel Marg</p>
                            </div>
                            <div className={s.photo}>
                                <Image src="/images/wFVJgjcEiePHQhiB5xCxnSM4MaY.jpg" alt="Handmade tortellini with herbs" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </div>
                        </Appear>
                        <Appear as="div" className={s.n2017} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.15}}>
                            <div className={s.rule2}>
                                <div className={s.dot2} />
                                <div className={s.line2} />
                            </div>
                            <div className={`${s.text11} ts-heading-4`}>
                                <h3>2017</h3>
                            </div>
                            <div className={`${s.text12} ts-caption`}>
                                <p>A first award, and a second sitting</p>
                            </div>
                            <div className={s.photo2}>
                                <Image src="/images/i51KgEHOzqI3A8F8PCSdB4E8DI.jpg" alt="Langoustine with blood orange and herb oil" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </div>
                        </Appear>
                        <Appear as="div" className={s.n2021} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.3}}>
                            <div className={s.rule3}>
                                <div className={s.dot3} />
                                <div className={s.line3} />
                            </div>
                            <div className={`${s.text13} ts-heading-4`}>
                                <h3>2021</h3>
                            </div>
                            <div className={`${s.text14} ts-caption`}>
                                <p>The Cellar Room opens downstairs</p>
                            </div>
                            <div className={s.photo3}>
                                <Image src="/images/4GZnbDaiYEUWFlF7W8cxGDnhY.jpg" alt="The Cellar Room long table beneath the wine wall" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </div>
                        </Appear>
                        <Appear as="div" className={s.n2026} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.45}}>
                            <div className={s.rule4}>
                                <div className={s.dot4} />
                                <div className={s.line4} />
                            </div>
                            <div className={`${s.text15} ts-heading-4`}>
                                <h3>2026</h3>
                            </div>
                            <div className={`${s.text16} ts-caption`}>
                                <p>One menu, eight courses, all year</p>
                            </div>
                            <div className={s.photo4}>
                                <Image src="/images/0jWFXM40GaSdwPlXOgrsvR3OCUc.jpg" alt="Sliced duck breast with cherry sauce" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </div>
                        </Appear>
                    </div>
                </div>
            </div>
            <div className={s.ourProducers}>
                <div className={s.inner4}>
                    <div className={s.header}>
                        <Appear as="div" className={`${s.text17} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2>{"Who we "}<em>cook with</em></h2>
                        </Appear>
                        <div className={`${s.text18} ts-body-s`}>
                            <p>Eleven farms, boats and growers, from the Aravallis to the Konkan coast.</p>
                        </div>
                    </div>
                    <div className={s.producers}>
                        {cms.producers.map((item, i) => (
                            <Appear key={item.id} as="div" className={s.producer} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}} delay={i * 0.1}>
                                <div className={s.photo5}>
                                    {item.photo?.src && (<Image src={item.photo?.src} alt={item.photo?.alt ?? ""} fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />)}
                                    <Appear as="div" className={s.badge} enter={{"opacity":0,"y":10}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.4}}>
                                        <Icon name="Map Pin" className={s.icon} color="var(--brass)" strokeWidth={1.5} />
                                        <div className={`${s.text19} ts-caption`}>
                                            <p>{item.produce}</p>
                                        </div>
                                    </Appear>
                                </div>
                                <div className={`${s.text20} ts-heading-6`}>
                                    <p>{item.name}</p>
                                </div>
                            </Appear>
                        ))}
                    </div>
                </div>
            </div>
            <div className={s.gallery}>
                <div className={s.inner5}>
                    <Appear as="div" className={s.column1} enter={{"opacity":0,"y":70}} transition={{"ease":[0.16,1,0.3,1],"duration":1.3,"delay":0}} amount={0.15}>
                        <div className={s.photo6}>
                            <Image src="/images/wK4dlSZIBdgY5Sa81cawjS4ZTc.jpg" alt="Palazzo dining room set for dinner" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                        <div className={s.photo7}>
                            <Image src="/images/tmyUjsPTEba6PgmDGTvrVP91y8.jpg" alt="Red wine poured into a glass" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                    </Appear>
                    <Appear as="div" className={s.column2} enter={{"opacity":0,"y":70}} transition={{"ease":[0.16,1,0.3,1],"duration":1.3,"delay":0.12}} amount={0.15}>
                        <div className={s.photo8}>
                            <Image src="/images/4GZnbDaiYEUWFlF7W8cxGDnhY.jpg" alt="Candlelit long table in the Cellar Room" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                        <div className={s.photo9}>
                            <Image src="/images/DXjCQzAYW7dY5elYPAAeVGO2OM.jpg" alt="Crate of seasonal vegetables from an Aravalli farm" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                    </Appear>
                    <Appear as="div" className={s.column3} enter={{"opacity":0,"y":70}} transition={{"ease":[0.16,1,0.3,1],"duration":1.3,"delay":0.24}} amount={0.15}>
                        <div className={s.photo10}>
                            <Image src="/images/U5zqfHMU2wNCgd94vKFfoi44.jpg" alt="Black truffle shaved over pasta" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                        <div className={s.photo11}>
                            <Image src="/images/EZs84HTf5FfF0E4FoxpNDqsHU.jpg" alt="Palazzo dining room glowing at night" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                    </Appear>
                </div>
            </div>
            <div className={s.book}>
                <div className={s.inner6}>
                    <div className={`${s.text21} ts-heading-2`}>
                        <h2>{"Come and see it "}<em>lit</em></h2>
                    </div>
                    <div className={s.line5} />
                    <Button className={s.button2} variant="Bone" label={"Book a table"} link={"/reservations"} />
                </div>
            </div>
        </div>
    )
}
