"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const BASE_OFFSET = 18;

interface IndicatorPosition {
    indicatorPosition: number;
    setIndicatorPosition: (page: number) => void;
}

export const IndicatorPosition = createContext<IndicatorPosition | undefined>(undefined);

/**
 * Provider for the current page indicator position, needed to know where the indicator should be
 * when the page is changed. This component has to be placed high in the tree as the AnimationWrapper clears context and state
 * due to the nature of the workaround.
 * @author Lucas Bubner, 2024
 */
export function IndicatorPositionProvider({ children }: { children: React.ReactNode }) {
    const [indicatorPosition, setIndicatorPosition] = useState(BASE_OFFSET);

    return (
        <IndicatorPosition.Provider value={{ indicatorPosition, setIndicatorPosition }}>
            {children}
        </IndicatorPosition.Provider>
    );
}

/**
 * Current page indicator for the navbar.
 * @author Lucas Bubner, 2024
 */
export default function PageIndicator() {
    const pathname = usePathname();
    const last = useContext(IndicatorPosition);
    const [x, setX] = useState(0);

    useEffect(() => {
        function calculatePosition() {
            const offsets = [
                { path: "/~/home", offset: 0 },
                { path: "/~/accomplishments", offset: 80 },
                { path: "/~/technology", offset: 160 },
                { path: "/~/honourables", offset: 238 },
                { path: "/~/projects", offset: 318 },
                { path: "/~/links", offset: 398 },
                { path: "/~/cv", offset: 476 },
            ];
            const windowScale = window.innerWidth > 640 ? 1 : 0.675;
            const index = offsets.findIndex((o) => o.path === pathname);
            if (index === -1) return;
            setX(BASE_OFFSET + offsets[index].offset * windowScale);
        }
        window.addEventListener("resize", calculatePosition);
        calculatePosition();
        return () => window.removeEventListener("resize", calculatePosition);
    }, [pathname]);

    return (
        <div className="w-full">
            <motion.div
                initial={{ x: last?.indicatorPosition }}
                animate={{ x: x }}
                transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.2 }}
                onAnimationComplete={() => last?.setIndicatorPosition(x)}
                className="bg-red-600 py-[2px] w-4 px-1 rounded-2xl mb-[1px]"
            />
        </div>
    );
}
