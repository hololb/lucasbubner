"use client";

import { DownArrow } from "@/app/images";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { WriterStatus } from "./WriterStatus";

/**
 * Next page and scroll down arrow.
 * @author Lucas Bubner, 2024
 */
export default function Next() {
    const nextPage = useRef<HTMLAnchorElement>(null);
    const writer = useContext(WriterStatus);

    function next() {
        nextPage.current?.click();
    }

    useEffect(() => {
        if (!writer?.done || nextPage.current == null) {
            return;
        }
        window.addEventListener("wheel", next);
        return () => window.removeEventListener("wheel", next);
    }, [writer?.done, nextPage]);

    if (!writer?.done) return;

    return (
        <Link href="/~" ref={nextPage}>
            <div className="absolute bottom-16 left-[50%] translate-x-[-50%] opacity-80">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ y: [0, -30, 0], opacity: 1 }}
                    transition={{ y: { duration: 2, repeat: Infinity }, opacity: { duration: 5 } }}
                    className="pt-10 px-2"
                >
                    <Image src={DownArrow} alt="Down arrow" width={50} height={50} />
                </motion.div>
            </div>
        </Link>
    );
}
