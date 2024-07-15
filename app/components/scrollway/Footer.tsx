"use client";

import { RightArrow } from "@/app/images";
import { motion } from "framer-motion";
import Image from "next/image";
import SoundLink from "../SoundLink";

/**
 * Footer element for the scrollway.
 * @author Lucas Bubner, 2024
 */
export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-center h-1/2 mt-24 mb-12 gap-4">
            <motion.p
                className="text-3xl sm:text-5xl font-extrabold text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                I am <span className="__text-emp-red">Lucas Bubner</span>.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 1.2 }}
            >
                <SoundLink
                    href="/~/home"
                    // Ensure the default scroll behaviour is disabled, otherwise the exit animation will suddenly jump
                    // the page to the top and create a discontinuity
                    scroll={false}
                    className="text-[#727272] font-bold z-10 text-xl sm:text-2xl flex gap-2 items-center text-center bg-black/50 px-3 py-2 rounded-xl"
                >
                    <span>Read more</span>
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                        <Image src={RightArrow} width={32} alt="" />
                    </motion.div>
                </SoundLink>
            </motion.div>
        </div>
    );
}
