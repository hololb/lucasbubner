"use client";

import { motion } from "framer-motion";
import Script from "next/script";

export default function Background() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}>
            <canvas id="stars" className="absolute w-full h-dvh -z-10" />
            <Script src="/stars.js" />
        </motion.div>
    );
}
