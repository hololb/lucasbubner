"use client";

import { useContext, useEffect } from "react";
import { TreeStatus } from "./TreeStatus";

/**
 * Restrict viewport movement until the tree is ready to be displayed.
 */
export default function TreeLock({ threshold }: { threshold: number }) {
    const tree = useContext(TreeStatus);

    useEffect(() => {
        if (!tree) return;
        // Paired with the TreeLimited component, the user will not be able to see any content until the tree is ready
        // This also allows for the tree to do any background processing (such as the red line) without the user seeing it,
        // even if they try to override the overflow property in DevTools
        document.body.style.overflowY = tree.requirementMet(threshold) ? "auto" : "hidden";
    }, [tree, threshold]);

    return null;
}
