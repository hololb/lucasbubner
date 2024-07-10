"use client";

import { useContext } from "react";
import { TreeStatus } from "./TreeStatus";

/**
 * Block rendering until the requirement threshold is met.
 * @author Lucas Bubner, 2024
 */
export default function TreeLimited({ children, threshold }: { children: React.ReactNode, threshold: number; }) {
    const tree = useContext(TreeStatus);
    return <div style={{ opacity: tree?.requirementMet(threshold) ? 1 : 0 }}>{children}</div>;
}
