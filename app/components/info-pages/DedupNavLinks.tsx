"use client";

import { usePathname } from "next/navigation";

/**
 * Component to hide the ~/cv page from the navigation bar if the user is on the ~/home page, as the CV page is linked in the home page.
 * @author Lucas Bubner, 2024
 */
export default function DedupNavLinks({ children, path }: { children: React.ReactNode; path: string }) {
    const pathname = usePathname();
    return path === "/~/cv" && pathname === "/~/home" ? null : children;
}
