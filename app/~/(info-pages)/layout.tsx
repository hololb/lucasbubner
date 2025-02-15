import ContextualFadeIn from "@/app/components/info-pages/ContextualFadeIn";
import DedupNavLinks from "@/app/components/info-pages/nav/DedupNavLinks";
import PageIndicator from "@/app/components/info-pages/nav/PageIndicator";
import SoundLink from "@/app/components/SoundLink";
import { TreeStatusProvider } from "@/app/components/tree/TreeStatus";
import { Announce, At, Bubner, CV, Links, MainBackground, Script, Star } from "@/app/images";
import Image from "next/image";

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
        { src: CV, alt: "Go to CV/Resume", path: "/~/cv" },
    ];

    return (
        <ContextualFadeIn>
            <Image
                className="-z-10 object-cover inset-0 w-full h-full fixed"
                src={MainBackground}
                alt=""
                quality={100}
            />
            <nav
                role="navigation"
                className="z-10 fixed top-3 left-1/2 -translate-x-1/2 rounded-3xl m-auto bg-[#181a1b] flex flex-col items-center justify-center px-2 sm:px-6"
            >
                <div className="flex pt-2 gap-0 sm:gap-6">
                    {hrefs.map((href, i) => (
                        <DedupNavLinks key={i} path={href.path}>
                            <SoundLink
                                href={href.path}
                                title={href.alt + " • " + href.path}
                                className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] hover:bg-[#26292b] transition-colors p-1 rounded-xl"
                            >
                                <Image src={href.src} alt={href.alt} width={55} height={55} />
                            </SoundLink>
                        </DedupNavLinks>
                    ))}
                </div>
                <PageIndicator />
            </nav>
            <div className="py-10" />
            <main
                role="main"
                className="transition-[margin-top] bg-inherit relative flex flex-wrap justify-center items-center content-center min-h-[calc(100%-80px)]"
            >
                <TreeStatusProvider>{children}</TreeStatusProvider>
            </main>
        </ContextualFadeIn>
    );
}
