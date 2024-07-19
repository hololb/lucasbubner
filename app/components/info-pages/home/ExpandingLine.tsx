"use client";

import { motion } from "framer-motion";
import useSound from "use-sound";

/**
 * Expanding line animation and 'woosh'
 * @author Lucas Bubner, 2024
 */
export default function ExpandingLine() {
    const [playWoosh] = useSound("/sounds/woosh.wav");
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90%", opacity: 0 }}
            transition={{ delay: 0.4, duration: 1.4 }}
            className="absolute border border-white"
            onAnimationComplete={() => playWoosh()}
        />
    );
}
