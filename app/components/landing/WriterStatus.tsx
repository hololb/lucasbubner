"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface WriterStatusContextType {
    done: boolean;
    setDone: Dispatch<SetStateAction<boolean>>;
}

/**
 * Represents a React state of whether the Writer component has finished typing.
 */
export const WriterStatus = createContext<WriterStatusContextType | undefined>(undefined);

/**
 * State provider for the status of the Writer component.
 * @author Lucas Bubner, 2024
 */
export default function WriterStatusProvider({ children }: { children: React.ReactNode }) {
    const [done, setDone] = useState(false);

    return <WriterStatus.Provider value={{ done, setDone }}>{children}</WriterStatus.Provider>;
}
