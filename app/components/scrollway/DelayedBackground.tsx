"use client";

import { useContext, useEffect, useRef } from "react";
import { TreeStatus } from "../TreeStatus";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";

export default function DelayedBackground({
    children,
    background,
}: {
    children: React.ReactNode;
    background: StaticImageData;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const tree = useContext(TreeStatus);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.backgroundImage = `url(${background.src})`;
    }, [background.src]);

    return (
        <motion.div ref={ref} className="bg-[length:200%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {children}
        </motion.div>
    );
}
