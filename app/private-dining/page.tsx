import Image from "next/image"
import Appear from "@/components/framer/Appear"
import Button from "@/components/Button"
import Icon from "@/components/framer/Icon"
import FloorPlan from "@/components/FloorPlan"
import Form from "@/components/framer/Form"
import SubmitButton from "@/components/SubmitButton"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    "title": "Private Dining in Jaipur — The Cellar Room | Palazzo",
    "description": "Book the Cellar Room for 6 to 14 guests at one long walnut table beneath a wall of wine. Tasting menu, feast or lunch, with its own entrance on Bhagwan Das Road."
}

export default function PrivateDiningPage() {
    return (
        <div className={s.page}>
            <div className={s.hero}>
                <Appear as="div" className={s.cellarRoomPhoto} enter={{"scale":1.12}} transition={{"ease":[0.16,1,0.3,1],"duration":3,"delay":0}}>
                    <Image src="/images/4GZnbDaiYEUWFlF7W8cxGDnhY.jpg" alt="The Cellar Room, a long walnut table beneath a wall of wine" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                </Appear>
                <div className={s.shade} />
                <div className={s.inner}>
                    <Appear as="div" className={`${s.text} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.35}}>
                        <h1>{"The "}<em>Cellar</em>{" Room"}</h1>
                    </Appear>
                    <Appear as="div" className={s.row} enter={{"opacity":0,"y":12}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.8}}>
                        <div className={`${s.text2} ts-body-l`}>
                            <p>A private room under the restaurant, with one long walnut table and a wall of wine.</p>
                        </div>
                        <Button className={s.button} variant="Bone" label={"Enquire about a date"} link={"/private-dining#enquiry"} />
                    </Appear>
                </div>
            </div>
            <div className={s.atAGlance}>
                <div className={s.inner2}>
                    <div className={s.facts}>
                        <Appear as="div" className={s.n6To14} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}}>
                            <Icon name="Users" className={s.icon} color="var(--brass)" />
                            <div className={s.gap} />
                            <div className={`${s.text3} ts-heading-5`}>
                                <p>6 to 14</p>
                            </div>
                            <div className={`${s.text4} ts-caption`}>
                                <p>guests at one table</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.n1800} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.1}}>
                            <Icon name="Credit Card" className={s.icon2} color="var(--brass)" />
                            <div className={s.gap2} />
                            <div className={`${s.text5} ts-heading-5`}>
                                <p>₹75,000</p>
                            </div>
                            <div className={`${s.text6} ts-caption`}>
                                <p>minimum spend for dinner</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.n3Menus} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.2}}>
                            <Icon name="Book Open" className={s.icon3} color="var(--brass)" />
                            <div className={s.gap3} />
                            <div className={`${s.text7} ts-heading-5`}>
                                <p>3 menus</p>
                            </div>
                            <div className={`${s.text8} ts-caption`}>
                                <p>or one written for you</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.ownEntrance} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.3}}>
                            <Icon name="Key" className={s.icon4} color="var(--brass)" />
                            <div className={s.gap4} />
                            <div className={`${s.text9} ts-heading-5`}>
                                <p>Own entrance</p>
                            </div>
                            <div className={`${s.text10} ts-caption`}>
                                <p>on Bhagwan Das Road</p>
                            </div>
                        </Appear>
                    </div>
                </div>
            </div>
            <div className={s.floorPlan}>
                <div className={s.inner3}>
                    <FloorPlan className={s.floorPlan2} variant="One table" showText={true} />
                    <div className={s.compact} data-framer-name="Compact">
                        <div className={`${s.text11} ts-heading-2`}>
                            <h2>{"One table, "}<em>or two</em></h2>
                        </div>
                        <div className={`${s.text12} ts-body-s`}>
                            <p>Seat everyone together, or split the table in two and start with a standing aperitif by the wine wall.</p>
                        </div>
                        <div className={s.planWrapper}>
                            <FloorPlan className={s.floorPlan3} variant="One table" showText={false} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.menus}>
                <div className={s.inner4}>
                    <Appear as="div" className={`${s.text13} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h2>{"Three ways "}<em>to dine</em></h2>
                    </Appear>
                    <div className={s.cards}>
                        <div className={s.theTastingMenu}>
                            <Appear as="div" className={s.plate} enter={{"opacity":0,"scale":0.85,"rotate":-40}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0.1}}>
                                <Image src="/images/wFVJgjcEiePHQhiB5xCxnSM4MaY.jpg" alt="Handmade tortellini in brown butter" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </Appear>
                            <div className={s.gap5} />
                            <div className={`${s.text14} ts-heading-6`}>
                                <h5>The tasting menu</h5>
                            </div>
                            <div className={`${s.text15} ts-caption`}>
                                <p>₹5,500 per guest</p>
                            </div>
                            <div className={`${s.text16} ts-caption`}>
                                <p>Eight courses, served to the whole table at once.</p>
                            </div>
                        </div>
                        <div className={s.theFeast}>
                            <Appear as="div" className={s.plate2} enter={{"opacity":0,"scale":0.85,"rotate":-40}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0.22}}>
                                <Image src="/images/WFhP1qAD77HhhoC7psJBDhWvL8.jpg" alt="Glazed black cod with mushrooms and greens" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </Appear>
                            <div className={s.gap6} />
                            <div className={`${s.text17} ts-heading-6`}>
                                <h5>The feast</h5>
                            </div>
                            <div className={`${s.text18} ts-caption`}>
                                <p>₹4,200 per guest</p>
                            </div>
                            <div className={`${s.text19} ts-caption`}>
                                <p>Large plates passed down the table, family style.</p>
                            </div>
                        </div>
                        <div className={s.lunchInTheCellar}>
                            <Appear as="div" className={s.plate3} enter={{"opacity":0,"scale":0.85,"rotate":-40}} transition={{"ease":[0.16,1,0.3,1],"duration":1.4,"delay":0.34}}>
                                <Image src="/images/L5Wcqw1oK1gJbXxAj4GmEOaUhr8.jpg" alt="Chocolate dessert with ice cream and blood orange" fill sizes="(max-width: 809px) 100vw, 50vw" className="fr-img" />
                            </Appear>
                            <div className={s.gap7} />
                            <div className={`${s.text20} ts-heading-6`}>
                                <h5>Lunch in the cellar</h5>
                            </div>
                            <div className={`${s.text21} ts-caption`}>
                                <p>₹2,800 per guest</p>
                            </div>
                            <div className={`${s.text22} ts-caption`}>
                                <p>Four courses, Saturday and Sunday from 12:30 pm.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.enquiry} id="enquiry">
                <div className={s.inner5}>
                    <div className={s.contact}>
                        <Appear as="div" className={`${s.text23} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2>{"Tell us about "}<em>the evening</em></h2>
                        </Appear>
                        <div className={`${s.text24} ts-body-s`}>
                            <p>Ananya plans every private dinner and replies within a day. You can also write to events@palazzojaipur.in.</p>
                        </div>
                    </div>
                    <Form className={s.form}>
                        <div className={s.row2}>
                            <label className={s.frame}>
                                <div className={`${s.text25} ts-caption`}>
                                    <p>Name</p>
                                </div>
                                <input className={s.name} name="Name" required type="text" placeholder="Your name" />
                            </label>
                            <label className={s.frame2}>
                                <div className={`${s.text26} ts-caption`}>
                                    <p>Email</p>
                                </div>
                                <input className={s.email} name="Email" required type="email" placeholder="you@example.com" />
                            </label>
                        </div>
                        <div className={s.row3}>
                            <label className={s.frame3}>
                                <div className={`${s.text27} ts-caption`}>
                                    <p>Date</p>
                                </div>
                                <input className={s.date} name="Date" type="date" placeholder="Pick a date" />
                            </label>
                            <label className={s.frame4}>
                                <div className={`${s.text28} ts-caption`}>
                                    <p>Guests</p>
                                </div>
                                <input className={s.guests} name="Guests" type="number" placeholder="Number of guests" />
                            </label>
                        </div>
                        <label className={s.frame5}>
                            <div className={`${s.text29} ts-caption`}>
                                <p>Occasion</p>
                            </div>
                            <select className={s.occasion} name="Occasion">
                                <option value="Birthday">
                                    Birthday
                                </option>
                                <option value="Business dinner">
                                    Business dinner
                                </option>
                                <option value="Anniversary">
                                    Anniversary
                                </option>
                                <option value="Roka or engagement">
                                    Roka or engagement
                                </option>
                                <option value="Something else">
                                    Something else
                                </option>
                            </select>
                        </label>
                        <label className={s.frame6}>
                            <div className={`${s.text30} ts-caption`}>
                                <p>Message</p>
                            </div>
                            <textarea className={s.message} name="Message" placeholder="Anything we should know: allergies, timing, a speech…" />
                        </label>
                        <SubmitButton className={s.submitButton} variant="Default" label={"Send enquiry"} successVariant="Success" pendingVariant="Pending" errorVariant="Error" />
                    </Form>
                </div>
            </div>
        </div>
    )
}
