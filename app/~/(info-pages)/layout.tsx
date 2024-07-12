import ContextualFadeIn from "@/app/components/info-pages/ContextualFadeIn";
import { MainBackground } from "@/app/images";
import Image from "next/image";
import Link from "next/link";

/**
 * Common layout for the bubner.me information pages.
 * @author Lucas Bubner, 2024
 */
export default function Layout({ children }: { children: React.ReactNode }) {
    // Titles are handled by the individual pages using metadata, this component will provide
    // the background and navbar which is common to all info pages.
    return (
        <ContextualFadeIn>
            <Image className="fixed -z-10 object-cover" src={MainBackground} alt="" fill quality={100} />
            {children}
        </ContextualFadeIn>
    );
}
