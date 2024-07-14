"use client";

import { useContext, useEffect, useRef } from "react";
import { TreeStatus } from "../tree/TreeStatus";
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
    const documentContainer = useRef<HTMLDivElement>(null);
    const redLineImage = useRef<HTMLImageElement>(null);
    const tree = useContext(TreeStatus);

    useEffect(() => {
        if (!documentContainer.current) return;
        // Using a CSS property as a normal image does not have the capabilities of the background-repeat
        // property, which is essential for this background that will effectively "wrap" the entire contents
        // with one continuous image.
        documentContainer.current.style.backgroundImage = `url(${background.src})`;
    }, [background.src]);

    function recalculateHeight() {
        if (!documentContainer.current || !redLineImage.current) return;
        // The red line height should always be equal to the size of the document container
        redLineImage.current.height = documentContainer.current.getBoundingClientRect().height;
    }

    useEffect(() => {
        // For convenience, always scroll to the top on load to ensure they start from the top
        window.scrollTo({ top: 0, behavior: "smooth" });

        window.addEventListener("resize", recalculateHeight);
        return () => window.removeEventListener("resize", recalculateHeight);
    }, []);

    // Tree requirements (2) will be the two UpReveal components, where we should render the component
    // to trigger the appropriate animation for the red line

    return (
        <motion.div
            ref={documentContainer}
            className="bg-[length:200%] overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {tree?.requirementMet(2) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="absolute -z-10">
                    <Image
                        ref={redLineImage}
                        className="opacity-25 max-w-full -z-10"
                        draggable={false}
                        height={documentContainer.current?.getBoundingClientRect().height}
                        src={RedLine}
                        alt=""
                    />
                </motion.div>
            )}
            {children}
        </motion.div>
    );
}
