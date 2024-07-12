"use client";

import { RightArrow } from "@/app/images";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * Footer element for the scrollway.
 * @author Lucas Bubner, 2024
 */
export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-center h-1/2 mt-24 mb-12 gap-4">
            <motion.p
                className="text-5xl font-extrabold text-white"
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
                <Link
                    href="/~/home?f"
                    // Ensure the default scroll behaviour is disabled, otherwise the exit animation will suddenly jump
                    // the page to the top and create a discontinuity
                    scroll={false}
                    className="text-[#727272] font-bold z-10 text-2xl underline flex gap-2 items-center"
                >
                    <span>Read more</span>
                    <motion.div
                        initial={{ y: 3 }}
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                        <Image src={RightArrow} width={32} alt="" />
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
}
