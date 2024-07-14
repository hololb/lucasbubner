"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

/**
 * Current page indicator for the navbar.
 * @author Lucas Bubner, 2024
 */
export default function PageIndicator() {
    const BASE_OFFSET = 18;
    const pathname = usePathname();
    const [x, setX] = useState(0);

    useEffect(() => {
        function calculatePosition() {
            const offsets = [
                { path: "/~/home", offset: 0 },
                { path: "/~/accomplishments", offset: 80 },
                { path: "/~/technology", offset: 160 },
                { path: "/~/honourables", offset: 238 },
                { path: "/~/projects", offset: 318 },
                { path: "/~/links", offset: 397 },
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
                initial={{ opacity: 0.5 }}
                animate={{ x: x, opacity: 1 }}
                exit={{ width: "100%", x: 0, opacity: 0.5 }}
                transition={{ type: "spring", stiffness: 200, damping: 40 }}
                className="bg-red-600 px-1 py-[2px] w-4 rounded-2xl mb-[1px]"
            />
        </div>
    );
}
