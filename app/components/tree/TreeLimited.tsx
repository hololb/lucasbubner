"use client";

import { useContext } from "react";
import { TreeStatus } from "./TreeStatus";

/**
 * Block rendering until the requirement threshold is met.
 * @author Lucas Bubner, 2024
 */
export default function TreeLimited({ children, threshold }: { children: React.ReactNode, threshold: number; }) {
    const tree = useContext(TreeStatus);
    // We must continue rendering the component but set the opacity to 0, rather than returning null
    // This is because the component may be needed in the tree structure of the DOM, but it should be invisible
    // The red line renderer looks over the DOM, and will not account for this component if it is not taking a position in the tree
    return <div style={{ opacity: tree?.requirementMet(threshold) ? 1 : 0 }}>{children}</div>;
}
