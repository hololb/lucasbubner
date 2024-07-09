"use client";

import { motion } from "framer-motion";

/**
 * Client wrapper for landing page exit animation.
 */
export default function Slider({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: -1000 }}
            transition={{ opacity: { duration: 2 }, y: { duration: 0.6 } }}
        >
            {children}
        </motion.div>
    );
}
