"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TreeStatus } from "../TreeStatus";
import { useContext } from "react";
import { Stars } from "@/app/images";
import StarsAnimation from "./stars/StarsAnimation";

/**
 * Node and dots background.
 * @author Lucas Bubner, 2024
 */
export default function Background() {
    const writer = useContext(TreeStatus);

    if (!writer?.activityMet()) return;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="absolute">
            <StarsAnimation />
            <Image
                alt=""
                src={Stars}
                placeholder="blur"
                width={1920}
                height={1080}
                draggable={false}
                className="w-screen h-dvh object-cover"
            />
        </motion.div>
    );
}
