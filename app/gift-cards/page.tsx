import Appear from "@/components/framer/Appear"
import Button from "@/components/Button"
import Image from "next/image"
import TiltCard from "@/components/code/TiltCard"
import GiftCard from "@/components/GiftCard"
import GiftCardBuilder from "@/components/code/GiftCardBuilder"
import Icon from "@/components/framer/Icon"
import { cms } from "@/lib/cms"
import FAQItem from "@/components/FAQItem"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    "title": "Restaurant Gift Cards — Gift a Dinner | Palazzo Jaipur",
    "description": "Give a tasting dinner at Palazzo. Choose an amount, add a message and we send it by email or WhatsApp in a minute, or courier it on cotton card. Valid for twelve months."
}

export default function GiftCardsPage() {
    return (
        <div className={s.page}>
            <div className={s.hero}>
                <div className={s.inner}>
                    <div className={s.text}>
                        <Appear as="div" className={`${s.text2} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h1>{"Gift a "}<em>dinner</em></h1>
                        </Appear>
                        <div className={`${s.text3} ts-body-l`}>
                            <p>A Palazzo gift card covers the tasting menu, the pairing or any amount you choose. Sent in a minute, valid for twelve months.</p>
                        </div>
                        <Button className={s.button} variant="Bone" label={"Choose a gift card"} link={"/gift-cards#build"} />
                    </div>
                    <Appear as="div" className={s.cardStage} enter={{"opacity":0,"scale":0.96}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0.2}}>
                        <Image src="/images/3RbRnYj2OzMV4NmtWLvu0xKCEA.jpg" alt="Dark linen backdrop" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                        <div className={s.tiltCard}>
                            <TiltCard tilt={"10"} restAngle={"0"} sheen={"false"} radius={"16"} style={{ width: "100%", height: "100%" }}>
                                <div className={s.cardFan}>
                                    <GiftCard className={s.giftCard} variant="Night" title={"A tasting dinner for two"} subtitle={"With wine pairing"} price={"₹18,000"} number={"No. 0142"} />
                                    <GiftCard className={s.giftCard2} variant="Linen" title={"A tasting dinner for two"} subtitle={"With wine pairing"} price={"₹18,000"} number={"No. 0142"} />
                                    <GiftCard className={s.giftCard3} variant="Walnut" title={"A tasting dinner for two"} subtitle={"With wine pairing"} price={"₹18,000"} number={"No. 0142"} />
                                </div>
                            </TiltCard>
                        </div>
                    </Appear>
                </div>
            </div>
            <div className={s.buildYourCard} id="build">
                <div className={s.inner2}>
                    <div className={s.giftCardBuilder}>
                        <GiftCardBuilder brand={"Palazzo"} stagePhoto={"/images/3RbRnYj2OzMV4NmtWLvu0xKCEA.jpg"} amounts={"5000, 10000, 18000"} default={"18000"} postFee={"150"} checkout={"Email order"} email={"hello@palazzojaipur.in"} ink={"#111214"} ink2={"#1A1B1E"} bone={"#EEE7DB"} dust={"#A9A398"} brass={"#C9A56B"} style={{ width: "100%" }} />
                    </div>
                </div>
            </div>
            <div className={s.howItWorks}>
                <div className={s.inner3}>
                    <div className={s.steps}>
                        <Appear as="div" className={s.theyGetAnEmail} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}}>
                            <Icon name="Mail" className={s.icon} color="var(--brass)" />
                            <div className={`${s.text4} ts-heading-6`}>
                                <h5>They get an email or WhatsApp</h5>
                            </div>
                            <div className={`${s.text5} ts-caption`}>
                                <p>A link to the card and your message, the moment you pay by UPI or card.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.theyBookATable} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.1}}>
                            <Icon name="Calendar" className={s.icon2} color="var(--brass)" />
                            <div className={`${s.text6} ts-heading-6`}>
                                <h5>They book a table</h5>
                            </div>
                            <div className={`${s.text7} ts-caption`}>
                                <p>Online with the card code, any evening in the next 12 months.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.weTakeCareOfIt} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.2}}>
                            <Icon name="Check Circle" className={s.icon3} color="var(--brass)" />
                            <div className={`${s.text8} ts-heading-6`}>
                                <h5>We take care of it</h5>
                            </div>
                            <div className={`${s.text9} ts-caption`}>
                                <p>The amount comes off the bill. Anything left stays on the card.</p>
                            </div>
                        </Appear>
                    </div>
                </div>
            </div>
            <div className={s.questions}>
                <div className={s.inner4}>
                    <Appear as="div" className={`${s.text10} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h2><em>Questions</em></h2>
                    </Appear>
                    <div className={s.accordion}>
                        {cms.giftCardQuestions.map((item, i) => (
                            <FAQItem key={item.id} className={s.fAQItem} variant="Closed" question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
