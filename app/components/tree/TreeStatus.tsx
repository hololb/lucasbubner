"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface TreeStatusContextType {
    numCompleted: number;
    markDone: () => void;
    requirementMet: (reqs: number) => boolean;
    activityMet: () => boolean;
    reset: () => void;
}

/**
 * Represents a React state of whether how many higher components has finished operations.
 * This component is used when other components should yield until other sibling/parent components have finished what they are doing,
 * such as suspense or loading animations that should have full visibility before other components are rendered.
 */
export const TreeStatus = createContext<TreeStatusContextType | undefined>(undefined);

/**
 * State provider for the dynamic completion of operations.
 * @author Lucas Bubner, 2024
 */
export function TreeStatusProvider({ children, resetRoot }: { children: React.ReactNode; resetRoot?: boolean }) {
    // Using a number state instead of a boolean one to allow for components to check
    // how many operations have been completed, rather than just if they have been completed,
    // as some elements may want to run just before the last operation is completed etc.
    const [numCompleted, _setDone] = useState(0);
    const parent = useContext(TreeStatus);

    useEffect(() => {
        // Clearing the root TreeStatusProvider is useful in some cases where the child components will handle other state,
        // such as the info pages where the fade-in is handled by the ContextualFadeIn component.
        if (resetRoot) parent?.reset();
    }, [resetRoot, parent]);

    function markDone() {
        _setDone((p) => p + 1);
    }

    function requirementMet(reqs: number) {
        return numCompleted >= reqs;
    }

    function activityMet() {
        // Replicates the functionality of using a boolean state
        return numCompleted > 0;
    }

    function reset() {
        _setDone(0);
    }

    return (
        <TreeStatus.Provider value={{ numCompleted, markDone, requirementMet, activityMet, reset }}>
            {children}
        </TreeStatus.Provider>
    );
}
