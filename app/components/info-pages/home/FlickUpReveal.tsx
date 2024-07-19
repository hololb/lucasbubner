"use client";

import { motion } from "framer-motion";

/**
 * Basic upwards "flick" reveal for wrapped components.
 * @author Lucas Bubner, 2024
 */
export default function FlickUpReveal({ children, entryDelay }: { children: React.ReactNode; entryDelay: number }) {
    return (
        <motion.div initial={{ y: "200%" }} animate={{ y: 0 }} transition={{ delay: entryDelay }}>
            {children}
        </motion.div>
    );
}
