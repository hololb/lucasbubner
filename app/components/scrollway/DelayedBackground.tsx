"use client";

import { useContext, useEffect, useRef } from "react";
import { TreeStatus } from "../TreeStatus";
import { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { RedLine } from "@/app/images";
import Image from "next/image";

export default function DelayedBackground({
    children,
    background,
}: {
    children: React.ReactNode;
    background: StaticImageData;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const image = useRef<HTMLImageElement>(null);
    const tree = useContext(TreeStatus);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.backgroundImage = `url(${background.src})`;
    }, [background.src]);

    function recalculateHeight() {
        if (!ref.current || !image.current) return;
        image.current.height = ref.current.getBoundingClientRect().height;
    }

    useEffect(() => {
        window.addEventListener("resize", recalculateHeight);
        return () => window.removeEventListener("resize", recalculateHeight);
    }, []);

    return (
        <motion.div
            ref={ref}
            className="bg-[length:200%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {tree?.requirementMet(2) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="absolute -z-1">
                    <Image
                        ref={image}
                        className="opacity-25 max-w-full"
                        draggable={false}
                        height={ref.current?.getBoundingClientRect().height}
                        src={RedLine}
                        alt=""
                    />
                </motion.div>
            )}
            {children}
        </motion.div>
    );
}
