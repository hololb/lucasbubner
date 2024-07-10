"use client";

import { Bubner, Collar } from "@/app/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { TreeStatus } from "../TreeStatus";

/**
 * Enclosing collars of the scrollway displayed on entering the viewport.
 * @author Lucas Bubner, 2024
 */
export default function Collarband() {
    const tree = useContext(TreeStatus);
    const leftCollar = useRef<HTMLDivElement>(null);
    const rightCollar = useRef<HTMLDivElement>(null);

    function getTranslation(screenWidth: number) {
        // Linear regression of the steps that existed in lucasbubner v2
        // https://www.desmos.com/calculator/abobdln12v
        if (screenWidth >= 1800) return 100;
        return -0.4404511 * screenWidth + 1005.62;
    }

    useEffect(() => {
        function onResize() {
            if (leftCollar.current) {
                leftCollar.current.style.transform = `translateX(-${getTranslation(window.innerWidth)}px)`;
            }
            if (rightCollar.current) {
                rightCollar.current.style.transform = `translateX(${getTranslation(window.innerWidth)}px)`;
            }
        }
        window.addEventListener("resize", onResize);
    }, []);

    if (!tree?.requirementMet(2)) return;

    return (
        <div className="transition-transform mt-10 flex relative">
            <motion.div
                initial={{ opacity: 0, x: -800 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div ref={leftCollar} style={{ transform: `translateX(-${getTranslation(window.innerWidth)}px)` }}>
                    <Image className="opacity-40" alt="" src={Collar} />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute left-[50%] translate-x-[-50%]"
            >
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <Image alt="Lucas Bubner" src={Bubner} />
                </motion.div>
            </motion.div>
            <motion.div
                className="absolute right-0"
                initial={{ opacity: 1, x: 800 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div ref={rightCollar} style={{ transform: `translateX(${getTranslation(window.innerWidth)}px)` }}>
                    <Image className="opacity-40 rotate-180" alt="" src={Collar} />
                </div>
            </motion.div>
        </div>
    );
}
