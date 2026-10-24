import Appear from "@/components/framer/Appear"
import BookingWidget from "@/components/code/BookingWidget"
import Icon from "@/components/framer/Icon"
import Button from "@/components/Button"
import type { Metadata } from "next"
import s from "./page.module.css"

export const metadata: Metadata = {
    "title": "Book a Table — Reservations | Palazzo Jaipur",
    "description": "Reserve a table at Palazzo on Sardar Patel Marg, Jaipur. Tables open 60 days ahead at noon, Tuesday to Sunday. For six or more, write to us."
}

export default function ReservationsPage() {
    return (
        <div className={s.page}>
            <div className={s.bookATable}>
                <div className={s.inner}>
                    <div className={s.title}>
                        <Appear as="div" className={`${s.text} ts-display-page`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h1>{"Book "}<em>a table</em></h1>
                        </Appear>
                        <div className={`${s.text2} ts-body-l`}>
                            <p>Tables open 60 days ahead, at noon. We hold two tables each night for walk-ins at the counter.</p>
                        </div>
                        <div className={s.bookingsThrough}>
                            <div className={`${s.text3} ts-caption`}>
                                <p>Bookings through</p>
                            </div>
                            <div className={s.resy} data-framer-name="Resy">
                                <div className={`${s.text4} ts-caption`}>
                                    <p>WhatsApp</p>
                                </div>
                            </div>
                            <div className={s.tock}>
                                <div className={`${s.text5} ts-caption`}>
                                    <p>EazyDiner</p>
                                </div>
                            </div>
                            <div className={s.openTable}>
                                <div className={`${s.text6} ts-caption`}>
                                    <p>District</p>
                                </div>
                            </div>
                            <div className={s.sevenRooms}>
                                <div className={`${s.text7} ts-caption`}>
                                    <p>Swiggy Dineout</p>
                                </div>
                            </div>
                            <div className={s.email}>
                                <div className={`${s.text8} ts-caption`}>
                                    <p>Email</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Appear as="div" className={s.bookingWidget} enter={{"opacity":0,"y":24}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.2}}>
                        <BookingWidget layout={"Calendar"} bookings={"WhatsApp"} venueLink={""} email={"hello@palazzojaipur.in"} openDays={"0,2,3,4,5,6"} times={"19:00, 19:30, 20:00, 20:30, 21:00, 21:30"} fullTimes={"20:30, 21:00"} waitlistDays={"5"} daysAhead={"60"} maxGuests={"6"} defaultGuests={"2"} priceNote={"tasting menu ₹5,500 each"} button={"Reserve"} ink={"#111214"} bone={"#EEE7DB"} dust={"#A9A398"} brass={"#C9A56B"} style={{ width: "100%" }} />
                    </Appear>
                </div>
            </div>
            <div className={s.goodToKnow}>
                <div className={s.inner2}>
                    <Appear as="div" className={`${s.text9} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                        <h2>{"Good "}<em>to know</em></h2>
                    </Appear>
                    <div className={s.cards}>
                        <Appear as="div" className={s.changesAndCancellations} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0}}>
                            <Icon name="Clock" className={s.icon} color="var(--brass)" />
                            <div className={`${s.text10} ts-heading-6`}>
                                <h5>Changes and cancellations</h5>
                            </div>
                            <div className={`${s.text11} ts-caption`}>
                                <p>Free up to 48 hours before. After that, ₹2,000 per guest.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.allergiesAndDiets} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.1}}>
                            <Icon name="Alert Circle" className={s.icon2} color="var(--brass)" />
                            <div className={`${s.text12} ts-heading-6`}>
                                <h5>Allergies and diets</h5>
                            </div>
                            <div className={`${s.text13} ts-caption`}>
                                <p>Tell us when you book. Every course has a vegetarian and a Jain version.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.whatToWear} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.2}}>
                            <Icon name="Feather" className={s.icon3} color="var(--brass)" />
                            <div className={`${s.text14} ts-heading-6`}>
                                <h5>What to wear</h5>
                            </div>
                            <div className={`${s.text15} ts-caption`}>
                                <p>No dress code. Come as you are, the room is warm.</p>
                            </div>
                        </Appear>
                        <Appear as="div" className={s.children} enter={{"opacity":0,"y":20}} transition={{"ease":[0.16,1,0.3,1],"duration":1,"delay":0.3}}>
                            <Icon name="Smile" className={s.icon4} color="var(--brass)" />
                            <div className={`${s.text16} ts-heading-6`}>
                                <h5>Children</h5>
                            </div>
                            <div className={`${s.text17} ts-caption`}>
                                <p>Welcome at every age, with a shorter menu at half price.</p>
                            </div>
                        </Appear>
                    </div>
                </div>
            </div>
            <div className={s.findUs}>
                <div className={s.inner3}>
                    <div className={s.map}>
                        <div className={s.googleMaps}>
                            <iframe src="https://maps.google.com/maps?q=14%20Sardar%20Patel%20Marg%2C%20C-Scheme%2C%20Jaipur%20302001&z=16&output=embed" title="Map" loading="lazy" style={{ width: "100%", height: "100%", border: 0, borderRadius: "0px" }} />
                        </div>
                    </div>
                    <div className={s.info}>
                        <Appear as="div" className={`${s.text18} ts-heading-2`} enter={{"opacity":0,"y":32,"x":0,"filter":"blur(8px)"}} transition={{"ease":[0.16,1,0.3,1],"duration":1.2,"delay":0.05}}>
                            <h2>{"Find "}<em>us</em></h2>
                        </Appear>
                        <div className={`${s.text19} ts-body-m`}>
                            <p>14 Sardar Patel Marg, C-Scheme, Jaipur 302001. Ten minutes from Jaipur Junction, with valet parking at the door.</p>
                        </div>
                        <div className={s.hours}>
                            <div className={s.row}>
                                <div className={`${s.text20} ts-body-s`}>
                                    <p>Tuesday to Friday</p>
                                </div>
                                <div className={`${s.text21} ts-body-s`}>
                                    <p>7:00 pm to 11:30 pm</p>
                                </div>
                            </div>
                            <div className={s.row2}>
                                <div className={`${s.text22} ts-body-s`}>
                                    <p>Saturday and Sunday</p>
                                </div>
                                <div className={`${s.text23} ts-body-s`}>
                                    <p>12:30 to 3 pm, 7 to 11:30 pm</p>
                                </div>
                            </div>
                            <div className={s.row3}>
                                <div className={`${s.text24} ts-body-s`}>
                                    <p>Monday</p>
                                </div>
                                <div className={`${s.text25} ts-body-s`}>
                                    <p>Closed</p>
                                </div>
                            </div>
                        </div>
                        <Button className={s.button} variant="Outline" label={"Get directions"} link={"https://maps.google.com/?q=14+Sardar+Patel+Marg+C-Scheme+Jaipur+302001"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
