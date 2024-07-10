"use client";

import { SepBar } from "@/app/images";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Waved red bar separator.
 * @author Lucas Bubner, 2024
 */
export default function WavedBar() {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <Image draggable={false} src={SepBar} alt="" />
        </motion.div>
    );
}
