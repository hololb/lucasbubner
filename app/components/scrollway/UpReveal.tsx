"use client";

import { motion } from "framer-motion";
import { useContext } from "react";
import { TreeStatus } from "../TreeStatus";

/**
 * Upwards revealing animation for wrapped elements.
 * @author Lucas Bubner, 2024
 */
export default function UpReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
    const tree = useContext(TreeStatus);

    return (
        <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, ease: "easeInOut", duration: 0.9 }}
            onAnimationComplete={() => tree?.markDone()}
        >
            {children}
        </motion.p>
    );
}
