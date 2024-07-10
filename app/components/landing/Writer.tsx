"use client";

import { useContext } from "react";
import Typewriter from "typewriter-effect";
import { motion, useAnimation } from "framer-motion";
import { TreeStatus } from "../TreeStatus";

const shineVariants = {
    animate: {
        fontWeight: [700, 800, 700],
        backgroundPosition: ["100% 0", "-100% 0"],
        transition: {
            fontWeight: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
            },
            backgroundPosition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    },
};

/**
 * Blocking typewriter effect on landing.
 * @author Lucas Bubner, 2024
 */
export default function Writer() {
    const writer = useContext(TreeStatus);
    const shineEffect = useAnimation();

    return (
        <div className="text-center text-5xl/tight md:text-7xl/tight font-bold text-white">
            <motion.div
                animate={shineEffect}
                variants={shineVariants}
                className="font-bold bg-clip-text [text-shadow:0_0_10px_rgba(255,255,255,0.5)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] bg-[linear-gradient(to_left,#ffffff,#cf8184,#f78488)] bg-[length:200%_100%] bg-[100%_0]"
            >
                <Typewriter
                    options={{
                        cursor: "|",
                        delay: 90,
                    }}
                    onInit={(t) => {
                        t.pauseFor(800)
                            .typeString("computational<br>brilliance.")
                            .pauseFor(100)
                            .callFunction(() => {
                                writer?.markDone();
                                shineEffect.start("animate");
                            })
                            .start();
                    }}
                />
            </motion.div>
        </div>
    );
}
