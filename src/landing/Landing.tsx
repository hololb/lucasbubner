/**
 * bubner.me
 * @author Lucas Bubner, 2023
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Runway from "./Runway";
import "../css/Landing.css";

function Landing() {
    const nav = useNavigate();
    const [isWritten, setIsWritten] = useState(false);
    const [introDone, setIntroDone] = useState(false);
    const [isBgLoaded, setIsBgLoaded] = useState(false);
    const [shouldMove, setShouldMove] = useState(false);

    const handleIntroFinish = () => {
        window.removeEventListener("wheel", handleIntroFinish);
        setShouldMove(true);
        setTimeout(() => {
            setIntroDone(true);
        }, 400);
    };

    useEffect(() => {
        if (!isWritten) return;
        const script = document.createElement("script");
        script.src = "/stars.js";
        document.body.appendChild(script);
        window.addEventListener("wheel", handleIntroFinish);
    }, [isWritten]);

    function waitForBg() {
        const bg = document.getElementById("bg") as HTMLImageElement;
        if (bg) {
            if (bg.complete) {
                setIsBgLoaded(true);
            } else {
                bg.addEventListener("load", () => setIsBgLoaded(true));
            }
        } else {
            setTimeout(waitForBg, 1000);
        }
    }

    useEffect(() => {
        waitForBg();
    }, []);

    return (
        <motion.div
            id="App"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: "-100vw", transition: { duration: 0.75 } }}
            transition={{ duration: 0.25 }}
            onAnimationStart={() => {
                const collarband = document.getElementById("collarband");
                if (collarband) {
                    collarband.style.opacity = "0";
                }
            }}
        >
            <div id="intro" style={{ transform: shouldMove ? "translateY(-150vh)" : "translate(0)" }}>
                {isWritten && !introDone && (
                    <>
                        <div className="bg-elem">
                            <canvas id="stars" />
                            <canvas id="pulse" />
                            <img
                                alt=""
                                id="bg"
                                src="/starsbg.png"
                                className={isBgLoaded ? "fade-in" : "fade-out"}
                                draggable={false}
                            />
                            <div className="arrow-container">
                                <svg className="arrow" onClick={() => handleIntroFinish()} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            {!introDone && (
                <>
                    <div id="skip" style={{ opacity: shouldMove ? "0" : "1" }} onClick={() => {
                        handleIntroFinish();
                        setTimeout(() => nav("/~"), 400);
                    }}>
                        Skip <img alt="" src="/rightarrow.svg" className="rightarrow" />
                    </div>
                    <div id="heading" style={{ transform: shouldMove ? "translate(-50vw, -200vh)" : "reset" }}>
                        <div id="header">
                            {isWritten && (
                                <>
                                    <div id="supertext">
                                        computational
                                        <br />
                                        brilliance.
                                        <span id="blinker">|</span>
                                    </div>
                                </>
                            )}
                            <span id="typer">
                                {!isWritten && (
                                    <Typewriter
                                        options={{
                                            cursor: "|",
                                            delay: 90,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter
                                                .pauseFor(800)
                                                .typeString("computational<br>brilliance.")
                                                .pauseFor(100)
                                                .callFunction(() => {
                                                    setIsWritten(true);
                                                })
                                                .start();
                                        }}
                                    />
                                )}
                            </span>
                        </div>
                    </div>
                </>
            )}
            {introDone && <Runway />}
        </motion.div>
    );
}

export default Landing;
