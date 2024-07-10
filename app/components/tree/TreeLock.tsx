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
        document.body.style.overflowY = tree.requirementMet(threshold) ? "auto" : "hidden";
    }, [tree, threshold]);

    return null;
}
