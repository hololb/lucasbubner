"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Redirector component to unload the current boxes then smoothly transition over to the redirect.
 * @author Lucas Bubner, 2024
 */
export default function Serve() {
    const router = useRouter();

    useEffect(() => {
        const bodyRef = document.querySelector("body");
        if (bodyRef) {
            bodyRef.style.transition = "opacity 750ms";
            bodyRef.style.opacity = "0";
        }
        router.replace("/serve/cv");
    }, [router]);

    return null;
}