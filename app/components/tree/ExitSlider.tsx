"use client";

import { motion } from "framer-motion";

/**
 * Client wrapper for a page exit animation.
 * @author Lucas Bubner, 2024
 */
export default function ExitSlider({
    children,
    exitDirection,
}: {
    children: React.ReactNode;
    exitDirection: "up" | "down" | "left" | "right"; // Represents the direction the page will move towards on exit
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                // Move 1 full viewport in the specified direction, dynamic viewports are not
                // particularly required here so we can just use vh/vw
                x: exitDirection === "left" ? "-100vw" : exitDirection === "right" ? "100vw" : 0,
                y: exitDirection === "up" ? "-100vh" : exitDirection === "down" ? "100vh" : 0,
            }}
            transition={{ opacity: { duration: 0.8 }, y: { duration: 0.6 }, x: { duration: 0.6 } }}
        >
            {children}
        </motion.div>
    );
}
