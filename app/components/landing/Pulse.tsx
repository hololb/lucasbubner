"use client";

import { motion } from "framer-motion";
import { TreeStatus } from "../tree/TreeStatus";
import { useContext } from "react";

/**
 * Behind text red 'pulse' effect.
 * @author Lucas Bubner, 2024
 */
export default function Pulse() {
    const writer = useContext(TreeStatus);

    // Block render until the phrase has been fully written
    if (!writer?.activityMet()) return;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} className="absolute">
            <motion.div
                className="h-[500px] bg-[radial-gradient(circle_at_center,_#ed1c24,_rgba(255,0,0,0)_75%)] w-screen sm:w-[500px]"
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
