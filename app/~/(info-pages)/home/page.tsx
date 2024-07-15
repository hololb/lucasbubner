import Animated from "@/app/components/info-pages/Animated";
import Box from "@/app/components/info-pages/Box";
import ExpandingLine from "@/app/components/info-pages/ExpandingLine";
import MinBox from "@/app/components/info-pages/MinBox";
import SoundLink from "@/app/components/SoundLink";
import { Bubner, Profile } from "@/app/images";
import dynamic from "next/dynamic";
import Image from "next/image";

export const metadata = { title: "Lucas Bubner • Home" };

const GitHubRepoTree = dynamic(() => import("@/app/components/info-pages/GitHubRepoTree"), { ssr: false });

/**
 * Home page.
 * @author Lucas Bubner, 2024
 */
export default function Home() {
    return (
        <div className="flex flex-col">
            <MinBox
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.3 }}
            >
                <ExpandingLine />
                <div className="w-full flex justify-between items-center">
                    <Image src={Bubner} alt="Lucas Bubner" className="rounded-full" width={50} height={50} />
                    <Animated initial={{ y: "200%" }} animate={{ y: 0 }} transition={{ delay: 1.8 }}>
                        <span className="__text-emp-red whitespace-nowrap font-extrabold text-4xl">Lucas Bubner</span>
                    </Animated>
                    <SoundLink
                        title="Go to CV/Resume"
                        href="/~/cv"
                        className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] hover:bg-[#26292b] transition-colors p-1 rounded-xl"
                    >
                        <Image src={Profile} alt="Go to CV/Resume" width={55} height={55} />
                    </SoundLink>
                </div>
            </MinBox>
            <GitHubRepoTree />
            <Animated
                className="md:flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 4 }}
            >
                <Box size={100} className="w-full" entryDelay={3.2}>
                    <h1>Hi!</h1>
                    <p>
                        I'm <b>Lucas Bubner</b>, a <b>17-year-old</b> software developer. <br /> I am currently in high
                        school as a<b> Year 11 student</b> passionate in the STEM/IT industries. This website is a
                        showcase of my work and achievements.
                    </p>
                </Box>
                <Box size={80} className="w-full" entryDelay={3.7}>
                    <h1>What I do</h1>
                    <p>
                        I specialise in <b>software and academics</b>, consistently striving to exceed expectations. I
                        am highly <b>self-motivated</b>, always looking to learn and teach new things in a range of IT
                        industries.
                    </p>
                </Box>
            </Animated>
        </div>
    );
}
