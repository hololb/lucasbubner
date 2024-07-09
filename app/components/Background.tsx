"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { Stars } from "../images";

export default function Background() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="absolute">
            <canvas id="stars" className="absolute w-full h-dvh -z-10" />
            <Script src="/external/stars.js" />
            <Image
                alt=""
                src={Stars}
                width={1920}
                height={1080}
                draggable={false}
                className="opacity-25"
            />
        </motion.div>
    );
}
