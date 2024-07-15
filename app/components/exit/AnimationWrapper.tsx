"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import FrozenRoute from "./FrozenRoute";

/**
 * Client wrapper for framer-motion exit animations.
 */
export default function AnimationWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
    // The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
    // During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} id="bubner.me">
                <FrozenRoute>{children}</FrozenRoute>
            </motion.div>
        </AnimatePresence>
    );
}
