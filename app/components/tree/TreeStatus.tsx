"use client";

import { createContext, useState } from "react";

interface TreeStatusContextType {
    numCompleted: number;
    markDone: () => void;
    requirementMet: (reqs: number) => boolean;
    activityMet: () => boolean;
}

/**
 * Represents a React state of whether how many higher components has finished operations.
 */
export const TreeStatus = createContext<TreeStatusContextType | undefined>(undefined);

/**
 * State provider for the dynamic completion of operations.
 * @author Lucas Bubner, 2024
 */
export function TreeStatusProvider({ children }: { children: React.ReactNode }) {
    const [numCompleted, _setDone] = useState(0);

    function markDone() {
        _setDone((p) => p + 1);
    }

    function requirementMet(reqs: number) {
        return numCompleted >= reqs;
    }

    function activityMet() {
        return numCompleted > 0;
    }

    return (
        <TreeStatus.Provider value={{ numCompleted, markDone, requirementMet, activityMet }}>
            {children}
        </TreeStatus.Provider>
    );
}
