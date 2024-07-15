"use client";

import { AnimationProps, motion } from "framer-motion";

/**
 * Minimal animated box for custom box creation.
 * @author Lucas Bubner, 2024
 */
export default function MinBox({ children, ...props }: { children: React.ReactNode } & AnimationProps) {
    return (
        <motion.div className="__box" {...props}>
            {children}
        </motion.div>
    );
}
