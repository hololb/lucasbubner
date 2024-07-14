"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import UpReveal from "./UpReveal";
import { motion } from "framer-motion";

/**
 * Scrollway text and image combo.
 * @author Lucas Bubner, 2024
 */
export default function Section({
    comments,
    images,
    alignTextLeft,
}: {
    comments: JSX.Element[];
    images: { src: StaticImageData; alt: string }[];
    alignTextLeft?: boolean;
}) {
    // Custom stylings from v2 are being used as reimplementation is not necessary,
    // although in this implementation we're using them a lot nicer and more efficiently, where UpReveals
    // from the tree are now sequential and cannot be loaded out of order
    return (
        <div className={`__scrollway${alignTextLeft ? " __scrollway-align-right" : ""}`}>
            <motion.div
                className="__scrollway-imgs"
                initial={{ x: alignTextLeft ? "100%" : "-100%", opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        width={140}
                        src={image.src}
                        title={image.alt}
                        alt={image.alt}
                        draggable={false}
                    />
                ))}
            </motion.div>
            <div>
                {comments.map((comment, index) => (
                    <div key={index} className="text-white text-2xl font-light ml-8 mt-3 p-4 leading-snug z-10">
                        <UpReveal delay={index * 0.1} onScroll>
                            {comment}
                        </UpReveal>
                    </div>
                ))}
            </div>
        </div>
    );
}
