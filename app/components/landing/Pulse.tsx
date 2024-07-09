"use client";

import { motion } from "framer-motion";
import { WriterStatus } from "./WriterStatus";
import { useContext } from "react";

/**
 * Behind text red 'pulse' effect.
 * @author Lucas Bubner, 2024
 */
export default function Pulse() {
    const writer = useContext(WriterStatus);

    if (!writer?.done) return;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="absolute">
            <motion.div
                className="size-[500px] bg-[radial-gradient(circle_at_center,_#ed1c24,_rgba(255,0,0,0)_75%)]"
                animate={{
                    scale: [0.7, 1, 0.7],
                    opacity: [0.15, 0.27, 0.15],
                    transition: {
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    },
                }}
                transition={{ duration: 2 }}
            />
        </motion.div>
    );
}
