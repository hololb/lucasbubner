import ContextualFadeIn from "@/app/components/info-pages/ContextualFadeIn";
import { Announce, At, Bubner, Links, MainBackground, Profile, Script, Star } from "@/app/images";
import Image from "next/image";
import Link from "next/link";

/**
 * Common layout for the bubner.me information pages.
 * @author Lucas Bubner, 2024
 */
export default function Layout({ children }: { children: React.ReactNode }) {
    // Titles are handled by the individual pages using metadata, this component will provide
    // the background and navbar which is common to all info pages.

    const hrefs = [
        { src: Bubner, alt: "Home", path: "/~/home" },
        { src: Star, alt: "Accomplishments", path: "/~/accomplishments" },
        { src: Script, alt: "Technology", path: "/~/technology" },
        { src: Announce, alt: "Honourables", path: "/~/honourables" },
        { src: At, alt: "Projects", path: "/~/projects" },
        { src: Links, alt: "Links", path: "/~/links" },
        { src: Profile, alt: "Go to CV/Resume", path: "/~/serve" },
    ];

    return (
        <ContextualFadeIn>
            <Image className="fixed -z-10 object-cover" src={MainBackground} alt="" fill quality={100} />
            <div className="z-10 fixed top-3 left-1/2 -translate-x-1/2 rounded-3xl h-20 m-auto bg-[#181a1b] flex items-center justify-center px-2 gap-2 sm:px-6 sm:gap-6">
                {hrefs.map((href, i) => (
                    <Link key={i} href={href.path} className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] hover:bg-[#26292b] transition-colors p-1 rounded-xl">
                        <Image src={href.src} alt={href.alt} width={55} height={55} />
                    </Link>
                ))}
            </div>
            {/* TODO: Page indicator */}
            {children}
        </ContextualFadeIn>
    );
}
