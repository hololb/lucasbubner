"use client";

import { ScrollDown } from "@/app/images";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Reminder that the user should scroll to see more content.
 * @author Lucas Bubner, 2024
 */
export default function ScrollWarning() {
    const [scrolled, setScrolled] = useState(false);
    const controls = useAnimation();

    const variants = {
        display: {
            opacity: 1,
            y: 0,
            transition: {
                // Don't want to show the warning immediately
                delay: 3,
            },
        },
        // Replication of the animate.css headShake animation
        headShake: {
            x: [0, -6, 5, -3, 2, 0],
            rotateY: [0, -9, 7, -5, 3, 0],
            transition: {
                duration: 1,
                times: [0, 0.065, 0.185, 0.315, 0.435, 0.5],
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    };

    useEffect(() => {
        async function sequence() {
            await controls.start("display");
            controls.start("headShake");
        }
        sequence();
    }, [controls]);

    function handleScroll() {
        // Ensure the user scrolls down before removing the warning
        setScrolled(window.scrollY > 0);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="absolute top-[9%] right-2">
            <AnimatePresence>
                {!scrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: -200 }}
                        exit={{ opacity: 0 }}
                        animate={controls}
                        variants={variants}
                    >
                        <motion.div>
                            <Image src={ScrollDown} alt="Scroll down to read more" width={48} height={48} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
