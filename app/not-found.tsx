import FoggedWindow from "@/components/code/FoggedWindow"
import Appear from "@/components/framer/Appear"
import Button from "@/components/Button"
import s from "./not-found.module.css"

export default function NotFound() {
    return (
        <div className={s.page}>
            <div className={s.closed} data-framer-name="Closed">
                <div className={s.foggedWindow}>
                    <FoggedWindow word={"Closed"} wordY={"30"} wordWidth={"50"} warmGlow={"rgba(255,214,160,0.12)"} fogTint={"rgba(209,219,232,0.26)"} fogStrength={"1"} brush={"96"} brushPhone={"64"} fogRegrow={"8"} writeDelay={"0.7"} writeTime={"2.6"} wordFades={"30"} rewriteIdle={"9"} droplets={"true"} hint={"true"} hintLabel={"Wipe the glass, the lights are still on"} bone={"#EEE7DB"} style={{ width: "100%", height: "100%" }} />
                </div>
                <Appear as="div" className={`${s.text} ts-body-l`} enter={{"opacity":0}} transition={{"ease":[0.16,1,0.3,1],"duration":1.6,"delay":2.8}}>
                    <h1>This page is not on the menu tonight.</h1>
                </Appear>
                <Appear as="div" className={s.button} enter={{"opacity":0}} transition={{"ease":[0.16,1,0.3,1],"duration":1.6,"delay":3}}>
                    <Button variant="Bone" label={"Back to the home page"} link={"/"} />
                </Appear>
            </div>
        </div>
    )
}
