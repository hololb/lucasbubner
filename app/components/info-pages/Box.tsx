"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { TreeStatus } from "../tree/TreeStatus";
import { motion, useAnimation } from "framer-motion";

interface BoxProps {
    src: StaticImageData;
    size: number;
    extrablur?: boolean;
    href?: string;
    small?: boolean;
    entryDelay?: number;
    children: React.ReactNode;
}

/**
 * An information box with a background image and animation.
 * @author Lucas Bubner, 2024
 */
export default function Box({ src, size, extrablur, href, small, entryDelay, children }: BoxProps) {
    const root = useRef<HTMLElement>(null);
    const img = useRef<HTMLImageElement>(null);

    // This effect is used to blur the image when the entire box is being hovered. This property is not
    // able to be set directly through a hover:blur CSS class because the blur effect is scoped to whatever that element
    // is hovering. This was the proposed solution in v2 and since it works it has been cleaned up (refs instead of using `document`) and kept.
    useEffect(() => {
        if (!root.current || !img.current) return;
        const rootRef = root.current;
        const imgRef = img.current;

        function increaseBlur() {
            imgRef.style.setProperty("filter", "blur(5px)");
        }

        function decreaseBlur() {
            const blurAmount = extrablur ? 3 : 1;
            imgRef.style.setProperty("filter", `blur(${blurAmount}px)`);
        }

        rootRef.addEventListener("mouseover", increaseBlur);
        rootRef.addEventListener("mouseout", decreaseBlur);

        return () => {
            rootRef?.removeEventListener("mouseover", increaseBlur);
            rootRef?.removeEventListener("mouseout", decreaseBlur);
        };
    }, [extrablur]);

    const backgroundImage = (
        <div className="absolute -z-10">
            <Image
                ref={img}
                alt=""
                draggable={false}
                src={src}
                className="h-auto relative top-1/2 left-1/2 -translate-x-1/2 transition-[filter] duration-500"
                style={{ width: `${size}%` }}
            />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entryDelay || 0, type: "spring" }}
        >
            {href ? (
                <Link
                    ref={root as RefObject<HTMLAnchorElement>}
                    draggable={false}
                    className="__box hover:shadow-[0_0_20px_#ed1c24]"
                    style={{ minHeight: small ? "fit-content" : "30vh" }}
                    href={href}
                    target="_blank"
                >
                    {backgroundImage}
                    {children}
                </Link>
            ) : (
                <div
                    className="__box"
                    style={{ minHeight: small ? "fit-content" : "30vh" }}
                    ref={root as RefObject<HTMLDivElement>}
                >
                    {backgroundImage}
                    {children}
                </div>
            )}
        </motion.div>
    );
}
