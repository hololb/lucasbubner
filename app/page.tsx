import Image from "next/image";

import Background from "./components/landing/Background";
import Pulse from "./components/landing/Pulse";
import Writer from "./components/landing/Writer";
import { TreeStatusProvider } from "./components/TreeStatus";

import { RightArrow, Stars } from "./images";
import Link from "next/link";
import Next from "./components/landing/Next";
import Slider from "./components/landing/Slider";
import Head from "next/head";

/**
 * bubner.me
 * @author Lucas Bubner, 2024
 */
export default function Index() {
    return (
        <Slider>
            <Head>
                <link rel="preload" href={Stars.src} as="image" />
            </Head>
            <Link href="/~/home" className="absolute top-0 right-0 p-4 flex gap-2 text-[#727272] font-bold z-10">
                Skip <Image src={RightArrow} alt="Right arrow" width={24} height={24} />
            </Link>
            <TreeStatusProvider>
                <Background />
                <div className="w-full h-dvh flex items-center flex-col justify-center absolute">
                    <Pulse />
                    <Writer />
                </div>
                <Next />
            </TreeStatusProvider>
        </Slider>
    );
}
