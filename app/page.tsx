import LazySusanHero from "@/components/code/LazySusanHero"
import Appear from "@/components/framer/Appear"
import Image from "next/image"
import Button from "@/components/Button"
import PairingSwitch from "@/components/code/PairingSwitch"
import PairingText from "@/components/code/PairingText"
import { cms, sortBy } from "@/lib/cms"
import HoverFollowImage from "@/components/code/HoverFollowImage"
import Icon from "@/components/framer/Icon"
import FoggedWindow from "@/components/code/FoggedWindow"
import Fact from "@/components/Fact"
import TiltCard from "@/components/code/TiltCard"
import GiftCard from "@/components/GiftCard"
import Pill from "@/components/Pill"
import BookingWidget from "@/components/code/BookingWidget"
import s from "./page.module.css"

export default function HomePage() {
    return (
        <div className={s.page}>
            <div className={s.hero}>
                <div className={s.lazySusanHero}>
                    <LazySusanHero courses={[{"name":"Heirloom tomato, *burrata,* basil","note":"First tomatoes at their ripest, torn burrata, first-press basil oil.","id":"default-item-0"},{"name":"Tiger prawn, *kokum,* finger lime","note":"Raw Konkan tiger prawn in herb oil, kokum, finger lime pearls.","id":"default-item-1"},{"name":"Beetroot, *smoked dahi,* bajra","note":"Hand-cut beetroot tartare, smoked hung curd, crisp bajra.","id":"default-item-2"},{"name":"Scallop, *brown butter,* hazelnut","note":"Hokkaido scallops seared in foaming butter, toasted hazelnut, pea shoots.","id":"default-item-3"},{"name":"Agnolotti, *sage,* aged parmesan","note":"Pasta pinched by hand each afternoon, sage brown butter, 36-month parmesan.","id":"default-item-4"},{"name":"Black cod, *miso,* dashi","note":"Cod cured for three days in white miso, kombu dashi, charred leek.","id":"default-item-5"},{"name":"Duck, *jamun,* charred endive","note":"Dry-aged Kuttanad duck breast, jamun jus, endive from the grill.","id":"default-item-6"},{"name":"Chocolate, *Nagpur orange,* cocoa nib","note":"Dark chocolate crémeux, Nagpur orange, cocoa nib tuile.","id":"default-item-7"}]} startCourse={"4"} plateSize={"1.08"} price={"₹5,500 per guest"} button={"Book the tasting menu"} buttonLink={"/reservations"} toggle={"Wine pairing"} hint={"Drag the table to turn it"} autoTurn={"4.8"} idleDelay={"7"} ink={"#111214"} bone={"#EEE7DB"} dust={"#A9A398"} brass={"#C9A56B"} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
            <div className={s.statement}>
                <div className={s.inner}>
                    <div className={s.sentence}>
                        <Appear as="div" className={`${s.text} ts-display-m`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h1>One table,</h1>
                        </Appear>
                        <Appear as="div" className={s.inlinePlate} enter={{"opacity":0,"scale":0.6,"rotate":-12}} transition={{"type":"spring","duration":1.4,"bounce":0.2,"delay":0.4}}>
                            <Image src="/images/V2RIAM3dgIZhRvjkYp6e9yDsaU.jpg" alt="Heirloom tomato and burrata salad on a green plate" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img fr-spin" />
                        </Appear>
                        <Appear as="div" className={`${s.text2} ts-display-m`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.2}}>
                            <h1><em>eight courses</em></h1>
                        </Appear>
                        <Appear as="div" className={`${s.text3} ts-display-m`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.35}}>
                            <h1>and the season</h1>
                        </Appear>
                        <Appear as="div" className={s.inlineImageTruffle} enter={{"opacity":0,"scale":0.6,"rotate":-12}} transition={{"type":"spring","duration":1.4,"bounce":0.2,"delay":0.7}}>
                            <Image src="/images/U5zqfHMU2wNCgd94vKFfoi44.jpg" alt="Black truffle shaved over handmade pasta" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </Appear>
                        <Appear as="div" className={`${s.text4} ts-display-m`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.5}}>
                            <h1><em>as it arrives.</em></h1>
                        </Appear>
                    </div>
                    <Appear as="div" className={s.signature} enter={{"opacity":0}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.6}}>
                        <div className={s.chef}>
                            <Image src="/images/cMjEUvhqKyWBSGNP0wHRQAi1g.jpg" alt="Chef Arjun Rathore" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </div>
                        <div className={s.chefName}>
                            <div className={`${s.text5} ts-heading-6`}>
                                <h5><em>Arjun Rathore</em></h5>
                            </div>
                            <div className={`${s.text6} ts-body-s`}>
                                <p>Chef and owner since 2014</p>
                            </div>
                        </div>
                        <div className={s.gap} />
                        <Button className={s.button} variant="Outline" label={"Our story"} link={"/the-room"} />
                    </Appear>
                </div>
            </div>
            <div className={s.tonight}>
                <div className={s.inner2}>
                    <div className={s.stickyColumn}>
                        <Appear as="div" className={`${s.text7} ts-display-l`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2><em>Tonight</em></h2>
                        </Appear>
                        <div className={`${s.text8} ts-body-l`}>
                            <p>Eight courses at one seating, from 7:30 pm. The menu changes with the market, so it may differ on the night.</p>
                        </div>
                        <div className={s.price}>
                            <div className={`${s.text9} ts-heading-3`}>
                                <p>₹5,500</p>
                            </div>
                            <div className={`${s.text10} ts-body-m`}>
                                <p>per guest</p>
                            </div>
                        </div>
                        <div className={s.pairingPrice}>
                            <div className={s.pairingSwitch}>
                                <PairingSwitch label={"Wine pairing"} switches={"Wine ⇄ no alcohol"} size={"15"} text={"#EEE7DB"} trackOff={"rgba(238,231,219,0.18)"} trackOn={"#C9A56B"} thumb={"#EEE7DB"} />
                            </div>
                            <div className={s.pairingText}>
                                <PairingText withWine={"+ ₹3,500"} noAlcohol={"+ ₹1,800"} noPairing={""} family={"Geist"} size={"15"} lineHeight={"1.4"} color={"#C9A56B"} align={"left"} />
                            </div>
                        </div>
                        <Button className={s.button2} variant="Bone" label={"Book the tasting menu"} link={"/reservations"} />
                    </div>
                    <div className={s.courseList} data-framer-name="Course list">
                        {sortBy(cms.courses, "order", "asc").map((item, i) => (
                            <Appear key={item.id} as="div" className={s.courseRow} data-framer-name="Course row" enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}} delay={i * 0.08}>
                                <div className={s.text11}>
                                    <p>{item.numeral}</p>
                                </div>
                                <div className={s.dish}>
                                    <div className={`${s.text12} ts-heading-5`}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={s.pairingText2}>
                                        <PairingText withWine={item.wine_pairing} noAlcohol={item.without_alcohol} noPairing={""} family={"Geist"} size={"15"} lineHeight={"1.4"} color={"#A9A398"} align={"left"} style={{ width: "100%" }} />
                                    </div>
                                </div>
                                <div className={s.hoverFollowImage}>
                                    <HoverFollowImage plate={item.plate} rowLayer={"Course row"} listLayer={"Course list"} size={"260"} plateZoom={"1.08"} dimOthers={"0.5"} style={{ width: "100%", height: "100%" }} />
                                </div>
                            </Appear>
                        ))}
                    </div>
                </div>
            </div>
            <div className={s.kitchen}>
                <Appear as="div" className={s.kitchenPhoto} enter={{"scale":1.08}} transition={{"ease":[0.16,1,0.3,1],"duration":1.8,"delay":0}} amount={0.1}>
                    <Image src="/images/Fib5yNg8nupdGOnw3jJP1jmhVo.jpg" alt="Chef plating a dish under the pass lamp in the Palazzo kitchen" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                </Appear>
                <div className={s.shade} />
                <div className={s.shade2} />
                <div className={s.inner3}>
                    <Appear as="div" className={`${s.text13} ts-heading-3`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h3>{"We cook what the market brings in "}<em>that morning.</em></h3>
                    </Appear>
                    <div className={`${s.text14} ts-body-l`}>
                        <p>Arjun Rathore and a kitchen of nine, behind an open pass on Sardar Patel Marg.</p>
                    </div>
                    <Button className={s.button3} variant="Glass" label={"Meet the kitchen"} link={"/the-room"} />
                </div>
                <Appear as="div" className={s.seasonalIngredient} enter={{"opacity":0,"y":80,"scale":0.96}} transition={{"ease":[0.16,1,0.3,1],"duration":1.3,"delay":0.25}} amount={0.3}>
                    <Image src="/images/U5zqfHMU2wNCgd94vKFfoi44.jpg" alt="Black truffle shaved over pasta at the table" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                    <Appear as="div" className={s.badge} enter={{"opacity":0,"y":8}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.8}}>
                        <Icon name="Sparkle" className={s.icon} color="var(--brass)" strokeWidth={1.5} />
                        <div className={`${s.text15} ts-body-s`}>
                            <p>Black truffle, flown in until March</p>
                        </div>
                    </Appear>
                </Appear>
            </div>
            <div className={s.foggedWindow}>
                <div className={s.window}>
                    <div className={s.foggedWindow2}>
                        <FoggedWindow word={"Come in"} wordY={"30"} wordWidth={"54"} warmGlow={"rgba(255,214,160,0.12)"} fogTint={"rgba(209,219,232,0.26)"} fogStrength={"1"} brush={"96"} brushPhone={"64"} fogRegrow={"8"} writeDelay={"0.7"} writeTime={"2.6"} wordFades={"30"} rewriteIdle={"9"} droplets={"true"} hint={"true"} hintLabel={"Wipe the glass to look inside"} bone={"#EEE7DB"} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <Appear as="div" className={`${s.text16} ts-body-l`} enter={{"opacity":0}} transition={{"ease":[0.16,1,0.3,1],"duration":1.6,"delay":2.8}}>
                        <p>Dinner from 7:00 pm, Tuesday to Sunday. 14 Sardar Patel Marg, C-Scheme, Jaipur.</p>
                    </Appear>
                    <Appear as="div" className={s.button4} enter={{"opacity":0}} transition={{"ease":[0.16,1,0.3,1],"duration":1.6,"delay":3}}>
                        <Button variant="Glass" label={"Book a table for tonight"} link={"/reservations"} />
                    </Appear>
                </div>
            </div>
            <div className={s.privateDiningAndGiftCards}>
                <div className={s.inner4}>
                    <div className={s.privateDining}>
                        <Appear as="div" className={s.cellarRoomPhoto} enter={{"opacity":0,"scale":0.9}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0}}>
                            <Image src="/images/4GZnbDaiYEUWFlF7W8cxGDnhY.jpg" alt="The Cellar Room, a long candlelit table beside a wall of wine" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        </Appear>
                        <div className={s.titleRow}>
                            <div className={`${s.text17} ts-heading-4`}>
                                <h3>Private dining</h3>
                            </div>
                            <div className={s.spacer} />
                            <Button className={s.button5} variant="Outline" label={"Enquire"} link={"/private-dining"} />
                        </div>
                        <div className={`${s.text18} ts-body-l`}>
                            <p>The Cellar Room seats up to 14 at one long walnut table, with its own menu and sommelier.</p>
                        </div>
                        <div className={s.roomFacts}>
                            <Fact className={s.fact} label={"6 to 14 guests"} />
                            <Fact className={s.fact2} label={"Own sommelier"} />
                            <Fact className={s.fact3} label={"Lunch or dinner"} />
                        </div>
                    </div>
                    <div className={s.giftCards}>
                        <div className={s.cardStage}>
                            <Image src="/images/3RbRnYj2OzMV4NmtWLvu0xKCEA.jpg" alt="Dark linen backdrop" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            <div className={s.tiltCard}>
                                <TiltCard tilt={"10"} restAngle={"6"} sheen={"true"} radius={"16"} style={{ width: "100%", height: "100%" }}>
                                    <GiftCard className={s.giftCard} variant="Walnut" title={"A tasting dinner for two"} subtitle={"With wine pairing"} price={"₹18,000"} number={"No. 0142"} />
                                </TiltCard>
                            </div>
                        </div>
                        <div className={s.titleRow2}>
                            <div className={`${s.text19} ts-heading-4`}>
                                <h3>Gift a dinner</h3>
                            </div>
                            <div className={s.spacer2} />
                            <Button className={s.button6} variant="Bone" label={"Buy a gift card"} link={"/gift-cards"} />
                        </div>
                        <div className={`${s.text20} ts-body-l`}>
                            <p>Sent by email or WhatsApp in a minute, or couriered on cotton card. Valid for twelve months.</p>
                        </div>
                        <div className={s.amounts}>
                            <Pill className={s.pill} variant="Outline" label={"₹5,000"} link={"/gift-cards"} />
                            <Pill className={s.pill2} variant="Outline" label={"₹10,000"} link={"/gift-cards"} />
                            <Pill className={s.pill3} variant="Filled" label={"₹18,000"} link={"/gift-cards"} />
                            <Pill className={s.pill4} variant="Outline" label={"Any amount"} link={"/gift-cards"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.bookATable}>
                <Image src="/images/3RbRnYj2OzMV4NmtWLvu0xKCEA.jpg" alt="Dark linen backdrop" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                <div className={s.shade3} />
                <div className={s.inner5}>
                    <div className={s.title}>
                        <Appear as="div" className={`${s.text21} ts-display-xl`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2>{"Book "}<em>a table</em></h2>
                        </Appear>
                        <div className={`${s.text22} ts-body-l`}>
                            <p>Tables open 60 days ahead, at noon. For six or more, write to us and we will set the Cellar Room.</p>
                        </div>
                    </div>
                    <Appear as="div" className={s.bookingWidget} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.2}}>
                        <BookingWidget layout={"Compact"} bookings={"WhatsApp"} venueLink={""} email={"hello@palazzojaipur.in"} openDays={"0,2,3,4,5,6"} times={"19:00, 19:30, 20:00, 20:30, 21:00, 21:30"} fullTimes={"20:30, 21:00"} waitlistDays={"5"} daysAhead={"60"} maxGuests={"6"} defaultGuests={"2"} priceNote={"tasting menu ₹5,500 each"} button={"Find a table"} ink={"#111214"} bone={"#EEE7DB"} dust={"#A9A398"} brass={"#C9A56B"} style={{ width: "100%" }} />
                    </Appear>
                </div>
            </div>
        </div>
    )
}
