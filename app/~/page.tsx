import { StaticImageData } from "next/image";
import Collarband from "../components/scrollway/Collarband";
import DelayedBackground from "../components/scrollway/DelayedBackground";
import ScrollWarning from "../components/scrollway/ScrollWarning";
import UpReveal from "../components/scrollway/UpReveal";
import WavedBar from "../components/scrollway/WavedBar";
import TreeLimited from "../components/tree/TreeLimited";
import TreeLock from "../components/tree/TreeLock";
import { TreeStatusProvider } from "../components/tree/TreeStatus";
import {
    Bunyips,
    CSharp,
    Firebase,
    Flask,
    FRC,
    FTC,
    GitHub,
    iAwards,
    Java,
    MainBackground,
    Next,
    Python,
    React,
    RedLine,
    Stars,
    Tailwind,
    TypeScript,
    Unity,
    Vercel,
} from "../images";
import Section from "../components/scrollway/Section";
import Footer from "../components/scrollway/Footer";
import ExitSlider from "../components/tree/ExitSlider";
import ReactDOM from "react-dom";

/**
 * bubner.me scrollway page.
 * @author Lucas Bubner, 2024
 */
export default function Scrollway() {
    // Preload here again to ensure the browser gets it before the render
    // as TreeStatus will take some time showing animations before the component with this image is mounted
    ReactDOM.preload(RedLine.src, { as: "image" });
    // Preload for next page
    ReactDOM.preload(MainBackground.src, { as: "image" });

    const comments: JSX.Element[][] = [
        [
            <>
                I have a strong <span className="__text-emp-red">passion</span> for technology and software.
            </>,
            <>
                I build and develop to <span className="__text-emp-red">solve</span> problems.
            </>,
            <>
                I have a <span className="__text-emp-red">dedicated</span> work ethic.
            </>,
            <>
                I ensure my projects are of only the <span className="__text-emp-red">highest</span> standards.
            </>,
            <>
                I have a strong sense of <span className="__text-emp-red">responsibility</span> and always strive to{" "}
                <span className="__text-emp-red">exceed expectations</span>.
            </>,
        ],
        [
            <>
                I have skills with a <span className="__text-emp-red">wide range</span> of hardware and software tools.
            </>,
            <>
                I have experience communicating <span className="__text-emp-red">complex ideas</span> in an{" "}
                <span className="__text-emp-red">innovative</span> way.
            </>,
            <>
                I captain the Murray Bridge High School <span className="__text-emp-red">Student Robotics Club</span>.
            </>,
            <>
                I am a <span className="__text-emp-red">nationally recognised</span> winner at the AIIA iAwards 2023.
            </>,
            <>
                I create intellectual property to <span className="__text-emp-red">improve and provide</span>.
            </>,
        ],
        [
            <>
                I have experience in <span className="__text-emp-red">project management</span> and{" "}
                <span className="__text-emp-red">delivering on time</span>.
            </>,
            <>
                I follow <span className="__text-emp-red">industry standards</span> and{" "}
                <span className="__text-emp-red">best practices</span>.
            </>,
            <>
                I desire to <span className="__text-emp-red">positively impact</span> the world through technology.
            </>,
            <>
                I am a <span className="__text-emp-red">high-achieving</span> academic student.
            </>,
            <>
                I am a quick learner and <span className="__text-emp-red">adaptable</span> to new technologies and
                environments.
            </>,
        ],
        [
            <>
                I am proficient with <span className="__text-emp-red">multiple</span> programming languages.
            </>,
            <>
                I am committed to <span className="__text-emp-red">continuous learning</span> and{" "}
                <span className="__text-emp-red">professional growth</span>.
            </>,
            <>
                I am an adaptive <span className="__text-emp-red">problem solver</span>.
            </>,
            <>
                I am a <span className="__text-emp-red">self-directed</span> learner.
            </>,
            <>
                I am a <span className="__text-emp-red">critical</span> thinker.
            </>,
        ],
    ];

    const images: { src: StaticImageData; alt: string }[][] = [
        [
            { src: iAwards, alt: "Society: iAwards 2023" },
            { src: Bunyips, alt: "Society: Murray Bridge High School Student Robotics Club" },
            { src: FTC, alt: "Society: FIRST Tech Challenge Club Captain" },
            { src: FRC, alt: "Society: FIRST Robotics Competition Team Member" },
        ],
        [
            { src: Firebase, alt: "Platform: Firebase" },
            { src: Vercel, alt: "Platform: Vercel" },
            { src: Unity, alt: "Platform: Unity" },
            { src: GitHub, alt: "Platform: GitHub" },
        ],
        [
            { src: React, alt: "Framework: React" },
            { src: Flask, alt: "Framework: Flask" },
            { src: Next, alt: "Framework: Next.js" },
            { src: Tailwind, alt: "Framework: Tailwind CSS" },
        ],
        [
            { src: CSharp, alt: "Language: C#" },
            { src: TypeScript, alt: "Language: TypeScript" },
            { src: Python, alt: "Language: Python" },
            { src: Java, alt: "Language: Java" },
        ],
    ];

    return (
        <ExitSlider exitDirection="left">
            <TreeStatusProvider resetRoot>
                <DelayedBackground background={Stars}>
                    <TreeLock threshold={2} />
                    <main role="main">
                        <div className="flex items-center justify-center h-svh">
                            <div className="text-center text-white font-extrabold text-2xl/snug md:text-5xl/snug">
                                <UpReveal delay={0.2} markTree>
                                    I am a <span className="__text-emp-yellow">self-driven</span>,
                                </UpReveal>
                                <UpReveal delay={0.8} markTree>
                                    <span className="__text-emp-yellow">young</span> software developer.
                                </UpReveal>
                            </div>
                        </div>
                        <ScrollWarning />
                        <Collarband />
                        <TreeLimited threshold={2}>
                            <div className="flex items-center justify-center mt-24 mb-12">
                                <div className="text-center text-white font-bold text-2xl/snug md:text-5xl/snug">
                                    <UpReveal delay={0.8} onScroll>
                                        <span className="__text-emp-yellow">Nationally</span> recognised.
                                    </UpReveal>
                                    <UpReveal delay={1.3} onScroll>
                                        Academically <span className="__text-emp-yellow">accredited</span>.
                                    </UpReveal>
                                </div>
                            </div>
                            <WavedBar />
                            {[0, 1, 2, 3].map((idx) => (
                                <Section
                                    key={idx}
                                    comments={comments[idx]}
                                    images={images[idx]}
                                    alignTextLeft={idx % 2 !== 0}
                                />
                            ))}
                            <Footer />
                        </TreeLimited>
                    </main>
                </DelayedBackground>
            </TreeStatusProvider>
        </ExitSlider>
    );
}
