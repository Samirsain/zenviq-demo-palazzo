import Appear from "@/components/framer/Appear"
import Button from "@/components/Button"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    title: { absolute: "About this demo — Built by ZENVIQ Digital" },
    description: "Palazzo is a demo restaurant website designed and built by ZENVIQ Digital. We build websites like this for restaurants, cafés and hotels across India.",
}

export default function ReadMePage() {
    return (
        <div className={s.page}>
            <div className={s.title}>
                <div className={s.inner}>
                    <Appear as="div" className={`${s.text} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h1>{"Read "}<em>me</em></h1>
                    </Appear>
                    <div className={`${s.text2} ts-body-l`}>
                        <p>Palazzo is a demo website designed and built by ZENVIQ Digital. The restaurant, chef and prices are made up. The website is real, and we can build one like it for your restaurant, café or hotel.</p>
                    </div>
                    <Appear as="div" className={s.quickLaunchBanner} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.2}}>
                        <div className={s.text3}>
                            <div className={`${s.text4} ts-heading-5`}>
                                <h4>Want one for your restaurant?</h4>
                            </div>
                            <div className={`${s.text5} ts-body-s`}>
                                <p>Send your menu, photos and logo to info@zenviqdigital.in. We reply with a written quote first, then build it with you.</p>
                            </div>
                        </div>
                        <Button className={s.button} variant="Ink" label={"info@zenviqdigital.in"} link={"mailto:info@zenviqdigital.in?subject=A%20website%20like%20Palazzo"} />
                    </Appear>
                </div>
            </div>
            <div className={s.steps}>
                <div className={s.inner2}>
                    <div className={s.steps2}>
                        <Appear as="div" className={s.nameAndLogo} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0}}>
                            <div className={s.number}>
                                <div className={`${s.text6} ts-caption`}>
                                    <p>1</p>
                                </div>
                            </div>
                            <div className={`${s.text7} ts-heading-6`}>
                                <h5>Name and logo</h5>
                            </div>
                            <div className={`${s.text8} ts-caption`}>
                                <p>Your restaurant’s name and logo on every page, from the menu bar to the footer.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.colours} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.08}}>
                            <div className={s.number2}>
                                <div className={`${s.text9} ts-caption`}>
                                    <p>2</p>
                                </div>
                            </div>
                            <div className={`${s.text10} ts-heading-6`}>
                                <h5>Colours</h5>
                            </div>
                            <div className={`${s.text11} ts-caption`}>
                                <p>Your brand colours and fonts, set once and carried through every page.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.photos} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.16}}>
                            <div className={s.number3}>
                                <div className={`${s.text12} ts-caption`}>
                                    <p>3</p>
                                </div>
                            </div>
                            <div className={`${s.text13} ts-heading-6`}>
                                <h5>Photos</h5>
                            </div>
                            <div className={`${s.text14} ts-caption`}>
                                <p>Your dishes and your room. Overhead dish photos work best for the turning table.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.menu} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.24}}>
                            <div className={s.number4}>
                                <div className={`${s.text15} ts-caption`}>
                                    <p>4</p>
                                </div>
                            </div>
                            <div className={`${s.text16} ts-heading-6`}>
                                <h5>Menu</h5>
                            </div>
                            <div className={`${s.text17} ts-caption`}>
                                <p>Courses, prices in rupees, pairings, veg and Jain options and allergens, kept in one list that every page reads from.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.bookings} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.32}}>
                            <div className={s.number5}>
                                <div className={`${s.text18} ts-caption`}>
                                    <p>5</p>
                                </div>
                            </div>
                            <div className={`${s.text19} ts-heading-6`}>
                                <h5>Bookings</h5>
                            </div>
                            <div className={`${s.text20} ts-caption`}>
                                <p>Table bookings on WhatsApp, EazyDiner, District, Swiggy Dineout or email.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.publish} enter={{"opacity":0,"y":16}} transition={{"ease":[0.16,1,0.3,1],"duration":0.8,"delay":0.4}}>
                            <div className={s.number6}>
                                <div className={`${s.text21} ts-caption`}>
                                    <p>6</p>
                                </div>
                            </div>
                            <div className={`${s.text22} ts-heading-6`}>
                                <h5>Go live</h5>
                            </div>
                            <div className={`${s.text23} ts-caption`}>
                                <p>Your own domain, plus Google Business Profile and local SEO so people nearby find you.</p>
                            </div>
                        </Appear>
                    </div>
                </div>
            </div>
            <div className={s.heroTips}>
                <div className={s.inner3}>
                    <div className={s.lazySusanHeroBestResults}>
                        <div className={`${s.text24} ts-heading-6`}>
                            <h5>The turning table</h5>
                        </div>
                        <div className={`${s.text25} ts-caption`}>
                            <p>— Use 6 to 10 square photos shot from directly above, with the plate in the centre.</p>
                        </div>
                        <div className={`${s.text26} ts-caption`}>
                            <p>— Keep the same light and table colour in every photo so the turn feels like one table.</p>
                        </div>
                        <div className={`${s.text27} ts-caption`}>
                            <p>— Guests drag the table to turn it. Left alone, it turns by itself.</p>
                        </div>
                        <div className={`${s.text28} ts-caption`}>
                            <p>— Each course shows its name, a short note and the price for the evening.</p>
                        </div>
                    </div>
                    <div className={s.foggedWindowBestResults}>
                        <div className={`${s.text29} ts-heading-6`}>
                            <h5>The fogged window</h5>
                        </div>
                        <div className={`${s.text30} ts-caption`}>
                            <p>— Guests wipe the glass to look inside, and the fog slowly comes back.</p>
                        </div>
                        <div className={`${s.text31} ts-caption`}>
                            <p>— A short word is written in the fog, like “Come in” or “Swagat”.</p>
                        </div>
                        <div className={`${s.text32} ts-caption`}>
                            <p>— It works best with a warm, busy photo of your room at night.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
