"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Use the query string `f` as set from an earlier page to fade in the whole page for smoothness but continuity between pages.
 * The query string is removed after the fade-in to prevent it from happening again, allowing state to be preserved.
 * @author Lucas Bubner, 2024
 */
export default function ContextualFadeIn({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const shouldFade = searchParams.has("f");

    useEffect(() => {
        if (!shouldFade) return;
        // Replace and remove query string to prevent the fade-in from happening again
        router.replace(pathname);
    }, [shouldFade, router, pathname]);

    return (
        <motion.div
            initial={{ opacity: shouldFade ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-screen h-dvh"
        >
            {children}
        </motion.div>
    );
}
