"use client";

import { HTMLMotionProps, motion } from "framer-motion";

/**
 * A generic client component framer-motion div.
 * @author Lucas Bubner, 2024
 */
export default function Animated({ children, ...props }: { children: React.ReactNode } & HTMLMotionProps<"div">) {
    return <motion.div {...props}>{children}</motion.div>;
}
