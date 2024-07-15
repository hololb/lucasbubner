"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { RefObject, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SoundLink from "../SoundLink";
import useSound from "use-sound";

interface BoxProps {
    src?: StaticImageData;
    size: number;
    extrablur?: boolean;
    href?: string;
    small?: boolean;
    entryDelay?: number | void;
    children: React.ReactNode;
}

/**
 * An information box with a background image and animation.
 * @author Lucas Bubner, 2024
 */
export default function Box({
    src,
    size,
    extrablur,
    href,
    small,
    entryDelay,
    children,
    className,
}: BoxProps & { className?: string }) {
    const [playAppearSound] = useSound("/sounds/tap.wav");
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

        // Call at least once to set initial state
        decreaseBlur();

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
                src={src!}
                className="h-auto relative top-1/2 left-1/2 -translate-x-1/2 transition-[filter] duration-500"
                style={{ width: `${size}%` }}
            />
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entryDelay || 0, type: "spring", damping: 20, stiffness: 200 }}
            onAnimationComplete={() => playAppearSound()}
            className={className}
        >
            {href ? (
                <SoundLink
                    ref={root as RefObject<HTMLAnchorElement>}
                    draggable={false}
                    className="__box hover:shadow-[0_0_20px_#ed1c24]"
                    style={{ minHeight: small ? "fit-content" : "30vh" }}
                    href={href}
                    target="_blank"
                >
                    {src && backgroundImage}
                    {children}
                </SoundLink>
            ) : (
                <div
                    className="__box"
                    style={{ minHeight: small ? "fit-content" : "30vh" }}
                    ref={root as RefObject<HTMLDivElement>}
                >
                    {src && backgroundImage}
                    {children}
                </div>
            )}
        </motion.div>
    );
}
