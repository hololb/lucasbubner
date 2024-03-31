/**
 * Content module with runway scroll information showcase.
 * @author Lucas Bubner, 2023
 */
import { createRef, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimationOnScroll } from "react-animation-on-scroll";
import Section from "../components/Section";
import "../css/Runway.css";

function Runway() {
    const [isExplained, setIsExplained] = useState(false);
    const [isRedLineReady, setIsRedLineReady] = useState(false);
    const [hasntScrolled, setHasntScrolled] = useState(true);
    const scriptAppended = useRef(false);
    const winRef = createRef<HTMLDivElement>();

    const scrollListener = () => {
        setHasntScrolled(false);
        window.removeEventListener("scroll", scrollListener);
    };

    function calculateBackgroundHeight() {
        const bg = document.getElementById("stars-bg");
        const redline = document.getElementById("extd-bg");
        if (bg) {
            const redHeight = redline !== null ? redline.getBoundingClientRect().height : 0;
            bg.style.height = `${Math.max(document.body.offsetHeight, redHeight)}px`;
        }
    }

    useEffect(() => {
        calculateBackgroundHeight();
    }, [isRedLineReady, isExplained]);

    useEffect(() => {
        winRef.current?.scrollIntoView({ behavior: "auto" });
        setTimeout(() => {
            setIsExplained(true);
            if (!scriptAppended.current) {
                const script = document.createElement("script");
                script.src = "/globe.min.js";
                document.body.appendChild(script);
                scriptAppended.current = true;
            }
        }, 1000);

        // Await for the background image to load before rendering it
        const img = new Image();
        img.src = "/holobg.png";
        img.onload = () => {
            setIsRedLineReady(true);
        };

        // Attach a listener to remove the scroll indicator when the user scrolls
        window.addEventListener("scroll", scrollListener);
        window.addEventListener("resize", calculateBackgroundHeight);
    }, []);

    const comments = [
        [
            "I have a strong <strong>passion</strong> for technology and software.",
            "I build and develop to <strong>solve</strong> problems.",
            "I have a <strong>dedicated</strong> work ethic.",
            "I ensure my projects are of only the <strong>highest</strong> standards.",
            "I have a strong sense of <strong>responsibility</strong> and always strive to <strong>exceed expectations</strong>.",
        ],
        [
            "I have skills with a <strong>wide range</strong> of hardware and software tools.",
            "I have experience communicating <strong>complex ideas</strong> in an <strong>innovative</strong> way.",
            "I captain the Murray Bridge High School <strong>Student Robotics Club</strong>.",
            "I am a <strong>nationally recognised</strong> winner at the AIIA iAwards 2023.",
            "I create intellectual property to <strong>improve and provide</strong>.",
        ],
        [
            "I have experience in <strong>project management</strong> and <strong>delivering on time</strong>.",
            "I follow <strong>industry standards</strong> and <strong>best practices</strong>.",
            "I desire to <strong>positively impact</strong> the world through technology.",
            "I am a <strong>high-achieving</strong> academic student.",
            "I am a quick learner and <strong>adaptable</strong> to new technologies and environments.",
        ],
        [
            "I am proficient with <strong>multiple</strong> programming languages.",
            "I am committed to <strong>continuous learning</strong> and <strong>professional growth</strong>.",
            "I am an adaptive <strong>problem solver</strong>.",
            "I am a <strong>self-directed</strong> learner.",
            "I am a <strong>critical</strong> thinker.",
        ],
    ];

    const images = [
        ["/iawards.png", "/bunyipst.png", "/ftc.png", "/frc.png"],
        ["/firebase.png", "/vercelc.png", "/unity.png", "/githubw.png"],
        ["/react.svg", "/flask.png", "/nextjs.svg", "/tailwind.svg"],
        ["/cs.svg", "/typescript.svg", "/pythonf.svg", "/java.png"],
    ];

    const titles = [
        ["Society: iAwards 2023", "Society: Murray Bridge High School Student Robotics Club", "Society: FIRST Tech Challenge Team Captain", "Society: FIRST Robotics Competition Team Member"],
        ["Platform: Firebase", "Platform: Vercel", "Platform: Unity", "Platform: GitHub"],
        ["Framework: React", "Framework: Flask", "Framework: Next.js", "Framework: Tailwind CSS"],
        ["Language: C#", "Language: TypeScript", "Language: Python", "Language: Java"],
    ];

    return (
        <div id="main">
            <div ref={winRef} />
            <div className="text-container">
                <p className="text-line">
                    I am a <span className="text-emp">self-driven</span>,
                </p>
                <p className="text-line">
                    <span className="text-emp">young</span> software developer.
                </p>
            </div>
            {isExplained && (
                <>
                    <div className="scroll-indicator animate__animated animate__bounceInDown">
                        <svg id="mouse" style={{ opacity: hasntScrolled ? "1" : "0" }} />
                    </div>
                    <div id="maincontent">
                        <div id="stars-bg" />
                        <div id="extd-bg" className={isRedLineReady ? "fade-in" : "fade-out"} />
                        <div id="collarband">
                            <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true}>
                                <img alt="" id="collar-l" src="/collar.png" draggable={false} />
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true}>
                                <img alt="" id="collar-r" src="/collar2.png" draggable={false} />
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
                                <div id="geo-globe">
                                    <img id="pfp" alt="Lucas Bubner" src="/transparent.png" draggable={false} />
                                    <canvas id="canvas" />
                                </div>
                            </AnimationOnScroll>
                        </div>
                        <div className="text-element big">
                            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                                <p className="content">
                                    <span className="text-emp">Nationally</span> recognised.
                                </p>
                            </AnimationOnScroll>
                            <AnimationOnScroll animateIn="animate__fadeInUp" animateOnce={true}>
                                <p className="content">
                                    Academically <span className="text-emp">accredited</span>.
                                </p>
                            </AnimationOnScroll>
                        </div>
                        <AnimationOnScroll animateIn="animate__fadeIn" animateOnce={true}>
                            <img id="sep" src="/sep.png" />
                        </AnimationOnScroll>
                        <br />
                        {[0, 1, 2, 3].map((index) => (
                            <Section
                                key={index}
                                comments={comments}
                                titles={titles[index]}
                                images={images[index]}
                                index={index}
                                animateIn={index % 2 === 0 ? "animate__fadeInRight" : "animate__fadeInLeft"}
                                animateOnce={true}
                            />
                        ))}
                        <AnimationOnScroll
                            style={{ animationDelay: "1s" }}
                            animateIn="animate__fadeIn"
                            animateOnce={true}
                        >
                            <div className="text-element">
                                <p className="content huge">
                                    I am <span className="text-or">Lucas Bubner</span>.
                                </p>
                            </div>
                            <div className="mini-element">
                                <Link to="/~" id="next">
                                    Read more{" "}
                                    <img alt="right arrow" src="/rightarrow.svg" className="rightarrow moving" />
                                </Link>
                            </div>
                        </AnimationOnScroll>
                    </div>
                </>
            )}
        </div>
    );
}

export default Runway;
