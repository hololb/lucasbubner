"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import FrozenRoute from "./FrozenRoute";

/**
 * Client wrapper for framer-motion exit animations.
 */
export default function AnimationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                <FrozenRoute>{children}</FrozenRoute>
            </motion.div>
        </AnimatePresence>
    );
}
