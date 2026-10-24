import Appear from "@/components/framer/Appear"
import Pill from "@/components/Pill"
import { cms, sortBy } from "@/lib/cms"
import SpinPlate from "@/components/code/SpinPlate"
import Icon from "@/components/framer/Icon"
import PairingText from "@/components/code/PairingText"
import HintBadge from "@/components/HintBadge"
import PriceRoll from "@/components/code/PriceRoll"
import Button from "@/components/Button"
import PairingSwitch from "@/components/code/PairingSwitch"
import Image from "next/image"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    "title": "The Menu — Eight-Course Tasting Menu | Palazzo Jaipur",
    "description": "Eight seasonal courses for ₹5,500, with a ₹3,500 wine pairing or a ₹1,800 alcohol-free pairing. The menu follows the market and changes with the season."
}

export default function MenuPage() {
    return (
        <div className={s.page}>
            <div className={s.title}>
                <div className={s.inner}>
                    <Appear as="div" className={`${s.text} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h1>{"The "}<em>menu</em></h1>
                    </Appear>
                    <div className={s.intro}>
                        <div className={`${s.text2} ts-body-l`}>
                            <p>One menu of eight courses, served Tuesday to Sunday from 7:30 pm. It follows the market, so a course can change on the day.</p>
                        </div>
                        <div className={s.tabs}>
                            <Pill className={s.pill} variant="Filled" label={"Tasting menu"} link={"/menu#courses"} />
                            <Pill className={s.pill2} variant="Outline" label={"Pairings"} link={"/menu#pairings"} />
                            <Pill className={s.pill3} variant="Outline" label={"Allergens"} link={"/menu#allergens"} />
                            <Pill className={s.pill4} variant="Outline" label={"By the glass"} link={"/menu#wine"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.courseRail} id="courses">
                <div className={s.inner2}>
                    <div className={s.rail}>
                        {sortBy(cms.courses, "order", "asc").map((item, i) => (
                            <Appear key={item.id} as="div" className={s.courseCard} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}} delay={i * 0.1}>
                                <div className={s.spinPlate}>
                                    <SpinPlate plate={item.plate} plateZoom={"1.08"} turn={"0.12"} dragRail={"true"} style={{ width: "100%", height: "100%" }} />
                                </div>
                                <div className={s.gap} />
                                <div className={s.text3}>
                                    <p>{item.numeral}</p>
                                </div>
                                <div className={`${s.text4} ts-heading-card`}>
                                    <p>{item.name}</p>
                                </div>
                                <div className={`${s.text5} ts-body-s`}>
                                    <p>{item.description}</p>
                                </div>
                                <div className={s.allergens}>
                                    {item.gluten && (
                                        <Icon name="Wheat" className={s.icon} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                    {item.dairy && (
                                        <Icon name="Milk" className={s.icon2} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                    {item.nuts && (
                                        <Icon name="Nut" className={s.icon3} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                    {item.shellfish && (
                                        <Icon name="Shrimp" className={s.icon4} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                    {item.fish && (
                                        <Icon name="Fish" className={s.icon5} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                    {item.egg && (
                                        <Icon name="Egg" className={s.icon6} color="var(--brass)" strokeWidth={1.5} />
                                    )}
                                </div>
                                <div className={s.pairingText}>
                                    <PairingText withWine={item.wine_pairing} noAlcohol={item.without_alcohol} noPairing={""} family={"Geist"} size={"14"} lineHeight={"1.4"} color={"#C9A56B"} align={"left"} style={{ width: "100%" }} />
                                </div>
                            </Appear>
                        ))}
                    </div>
                    <HintBadge className={s.hintBadge} label={"Drag to see every course"} />
                </div>
            </div>
            <div className={s.priceAndPairings} id="pairings">
                <div className={s.inner3}>
                    <Appear as="div" className={s.priceCard} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}}>
                        <div className={`${s.text6} ts-label`}>
                            <p>Tasting menu</p>
                        </div>
                        <div className={`${s.text7} ts-heading-3`}>
                            <p>₹5,500</p>
                        </div>
                        <div className={`${s.text8} ts-body-s`}>
                            <p>Eight courses, bread and butter from our bakery, petits fours. Plus GST.</p>
                        </div>
                        <div className={s.total}>
                            <div className={`${s.text9} ts-body-s`}>
                                <p>With your pairing</p>
                            </div>
                            <div className={s.priceRoll}>
                                <PriceRoll menu={"5500"} wine={"3500"} noAlcohol={"1800"} prefix={"₹"} suffix={""} family={"Instrument Serif"} size={"26"} color={"#111214"} />
                            </div>
                        </div>
                        <Button className={s.button} variant="Ink" label={"Book the tasting menu"} link={"/reservations"} />
                    </Appear>
                    <Appear as="div" className={s.priceCard2} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.1}}>
                        <div className={`${s.text10} ts-label`}>
                            <p>Wine pairing</p>
                        </div>
                        <div className={`${s.text11} ts-heading-3`}>
                            <p>+ ₹3,500</p>
                        </div>
                        <div className={`${s.text12} ts-body-s`}>
                            <p>Six glasses chosen by Meera, our sommelier, poured with each course.</p>
                        </div>
                        <div className={s.pairingSwitch}>
                            <PairingSwitch label={"Wine pairing"} switches={"Wine on/off"} size={"15"} text={"#EEE7DB"} trackOff={"rgba(238,231,219,0.18)"} trackOn={"#C9A56B"} thumb={"#EEE7DB"} />
                        </div>
                    </Appear>
                    <Appear as="div" className={s.priceCard3} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.2}}>
                        <div className={`${s.text13} ts-label`}>
                            <p>Pairing without alcohol</p>
                        </div>
                        <div className={`${s.text14} ts-heading-3`}>
                            <p>+ ₹1,800</p>
                        </div>
                        <div className={`${s.text15} ts-body-s`}>
                            <p>Kanji, kombucha, teas and pressed juices made in the kitchen.</p>
                        </div>
                        <div className={s.pairingSwitch2}>
                            <PairingSwitch label={"No-alcohol pairing"} switches={"No alcohol on/off"} size={"15"} text={"#EEE7DB"} trackOff={"rgba(238,231,219,0.18)"} trackOn={"#C9A56B"} thumb={"#EEE7DB"} />
                        </div>
                    </Appear>
                </div>
            </div>
            <div className={s.allergensAndDiets} id="allergens">
                <div className={s.inner4}>
                    <div className={s.text16}>
                        <div className={`${s.text17} ts-heading-5`}>
                            <h4>Allergies and diets</h4>
                        </div>
                        <div className={`${s.text18} ts-body-s`}>
                            <p>Tell us when you book. Every course can be made vegetarian or Jain, and most without gluten or dairy.</p>
                        </div>
                    </div>
                    <div className={s.legend}>
                        <div className={s.gluten}>
                            <Icon name="Wheat" className={s.icon7} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text19} ts-caption`}>
                                <p>Gluten</p>
                            </div>
                        </div>
                        <div className={s.dairy}>
                            <Icon name="Milk" className={s.icon8} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text20} ts-caption`}>
                                <p>Dairy</p>
                            </div>
                        </div>
                        <div className={s.nuts}>
                            <Icon name="Nut" className={s.icon9} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text21} ts-caption`}>
                                <p>Nuts</p>
                            </div>
                        </div>
                        <div className={s.shellfish}>
                            <Icon name="Shrimp" className={s.icon10} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text22} ts-caption`}>
                                <p>Shellfish</p>
                            </div>
                        </div>
                        <div className={s.fish}>
                            <Icon name="Fish" className={s.icon11} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text23} ts-caption`}>
                                <p>Fish</p>
                            </div>
                        </div>
                        <div className={s.egg}>
                            <Icon name="Egg" className={s.icon12} color="var(--brass)" strokeWidth={1.5} />
                            <div className={`${s.text24} ts-caption`}>
                                <p>Egg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.wineByTheGlass} id="wine">
                <div className={s.inner5}>
                    <div className={s.list}>
                        <Appear as="div" className={`${s.text25} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2>{"By "}<em>the glass</em></h2>
                        </Appear>
                        <div className={s.wineList}>
                            {sortBy(cms.wines, "order", "asc").map((item, i) => (
                                <div key={item.id} className={s.wine}>
                                    <div className={`${s.text26} ts-caption`}>
                                        <p>{item.type}</p>
                                    </div>
                                    <div className={`${s.text27} ts-heading-card`}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={s.text28}>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={s.sommelier}>
                        <Appear as="div" className={s.pour} enter={{"opacity":0,"scale":0.92}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0}}>
                            <Image src="/images/tmyUjsPTEba6PgmDGTvrVP91y8.jpg" alt="Sommelier pouring red wine into a glass" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </Appear>
                        <div className={`${s.text29} ts-heading-6`}>
                            <p><em>“I look for wines that taste of a place and leave room for the food.”</em></p>
                        </div>
                        <div className={s.sommelierSignature}>
                            <div className={s.sommelierAvatar}>
                                <Image src="/images/oeyCzr1VjJstDwKo0Kzi0LS0MI.png" alt="Meera Kapoor, sommelier" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" style={{ objectPosition: "50% 30%" }} />
                            </div>
                            <div className={`${s.text30} ts-caption`}>
                                <p>Meera Kapoor, sommelier</p>
                            </div>
                        </div>
                        <Button className={s.button2} variant="Outline" label={"Ask for the full wine list"} link={"mailto:hello@palazzojaipur.in"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
