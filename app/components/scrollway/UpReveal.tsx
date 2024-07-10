"use client";

import { motion } from "framer-motion";
import { useContext } from "react";
import { TreeStatus } from "../tree/TreeStatus";

/**
 * Upwards revealing animation for wrapped elements.
 * @author Lucas Bubner, 2024
 */
export default function UpReveal({ children, delay, onScroll, markTree }: { children: React.ReactNode; delay: number; onScroll?: boolean; markTree?: boolean; }) {
    const tree = useContext(TreeStatus);
    
    const props = onScroll ? {
        whileInView: { opacity: 1, y: 0 },
    } : {
        animate: { opacity: 1, y: 0 },
    }

    return (
        <motion.p
            initial={{ opacity: 0, y: 40 }}
            transition={{ delay: delay, ease: "easeInOut", duration: 0.9 }}
            onAnimationComplete={() => markTree && tree?.markDone()}
            {...props}
        >
            {children}
        </motion.p>
    );
}
