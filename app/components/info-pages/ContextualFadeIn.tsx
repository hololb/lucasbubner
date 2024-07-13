"use client";

import { motion } from "framer-motion";
import { useContext } from "react";
import { TreeStatus } from "../tree/TreeStatus";

/**
 * Use the global tree context to determine whether a fade-in is required for this component.
 * @author Lucas Bubner, 2024
 */
export default function ContextualFadeIn({ children }: { children: React.ReactNode }) {
    // As this component should not have any parent tree providers other than root, this will be the root
    // The other pages using child components of TreeStatusProvider should reset the root provider, allowing the animation
    // to be fired when appropriate. We have to do it this way from the root provider because of the exit animation workaround
    // causing children of the FrozenRoute to be fully unmounted and remounted, clearing state. This also has the benefit of
    // refreshes causing one fade in animation, rather than multiple or none.
    const treeRoot = useContext(TreeStatus);

    return (
        <motion.div
            initial={{ opacity: treeRoot?.activityMet() ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => treeRoot?.markDone()}
            className="w-screen h-dvh"
        >
            {children}
        </motion.div>
    );
}
