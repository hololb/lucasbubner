import Image from "next/image";

import Background from "./components/landing/Background";
import Pulse from "./components/landing/Pulse";
import Writer from "./components/landing/Writer";
import { TreeStatusProvider } from "./components/tree/TreeStatus";

import { RedLine, RightArrow, Stars } from "./images";
import Next from "./components/landing/Next";
import ExitSlider from "./components/tree/ExitSlider";
import ReactDOM from "react-dom";
import SoundLink from "./components/SoundLink";

/**
 * bubner.me main landing page.
 * @author Lucas Bubner, 2024
 */
export default function Index() {
    ReactDOM.preload(Stars.src, { as: "image" });
    ReactDOM.preload(RedLine.src, { as: "image" });

    return (
        <ExitSlider exitDirection="up">
            <SoundLink
                href="/~/home"
                className="absolute top-0 right-0 m-3 p-2 flex gap-2 text-[#727272] font-bold z-10 bg-black/50 rounded-xl"
            >
                Skip <Image src={RightArrow} alt="" width={24} height={24} />
            </SoundLink>
            <TreeStatusProvider resetRoot>
                <Background />
                <div className="w-full h-dvh flex items-center flex-col justify-center absolute">
                    <Pulse />
                    <Writer />
                </div>
                <Next />
            </TreeStatusProvider>
        </ExitSlider>
    );
}
