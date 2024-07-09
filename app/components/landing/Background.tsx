"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { Stars } from "../../images";
import { WriterStatus } from "./WriterStatus";
import { useContext } from "react";

/**
 * Node and dots background.
 * @author Lucas Bubner, 2024
 */
export default function Background() {
    const writer = useContext(WriterStatus);

    if (!writer?.done) return;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="absolute">
            <canvas id="stars" className="absolute w-screen h-dvh -z-10" />
            <Script src="/external/stars.js" />
            <Image
                alt=""
                src={Stars}
                placeholder="blur"
                width={1920}
                height={1080}
                draggable={false}
                className="opacity-25 w-screen h-dvh object-cover"
            />
        </motion.div>
    );
}
