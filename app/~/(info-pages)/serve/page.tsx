"use client";

import { useRouter } from "next/navigation";

/**
 * Redirector component to unload the current boxes then smoothly transition over to the redirect.
 * @author Lucas Bubner, 2024
 */
export default function Serve() {
    const router = useRouter();
    const bodyRef = document.querySelector("body");

    if (bodyRef) {
        bodyRef.style.transition = "opacity 750ms";
        bodyRef.style.opacity = "0";
        router.replace("/serve/cv");
    }

    return null;
}