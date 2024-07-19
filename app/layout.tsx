import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnimationWrapper from "./components/exit/AnimationWrapper";
import { TreeStatusProvider } from "./components/tree/TreeStatus";
import { IndicatorPositionProvider } from "./components/info-pages/nav/PageIndicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lucas Bubner",
    description: "A young self-driven academic student and software developer.",
};

/**
 * bubner.me root layout.
 * @author Lucas Bubner, 2024
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Note: A tree status provider is added here as the "root" tree layout, as it is used in the info pages to determine
    // if a fade animation is required between pages. Pages that need this context for themselves will define another tree status provider
    // as React will go to the nearest provider parent when looking for context.

    // An additional provider not used in the main landing page but used in the ~/home etc. routes is here to ensure the context is not lost
    // as AnimationWrapper clears context and state due to the nature of the workaround. If a way to have exit animations without this workaround
    // is implemented, then this provider can be removed from here.
    return (
        <html lang="en">
            <head>
                <Script
                    async
                    data-pace-options='{"eventLag": false, "restartOnRequestAfter": false}'
                    src="/external/pace.min.js"
                    // Ensure we always have a loading bar before anything else
                    strategy="beforeInteractive"
                />
                <meta name="darkreader-lock" />
            </head>
            <body className={`${inter.className} bg-black overflow-x-hidden`}>
                <noscript
                    // framer-motion does not like it when JavaScript is disabled, often leaving components stuck at opacity: 0, therefore
                    // we will force absolutely everything on the pages to be visible in the event we don't have JavaScript. We also try
                    // to select the custom __nsz (no-script-zero) and box classes to reset transform properties for these items that move on entry.
                    dangerouslySetInnerHTML={{
                        __html: `<style>* { opacity: 1 !important } .__nsi { visibility: hidden } .__nsz, .__box, :has(.__box) { transform: translate(0) !important }</style>`,
                    }}
                />
                <noscript>
                    <div className="fixed top-0 lg:bottom-0 lg:top-auto w-screen h-9 bg-yellow-600/30 text-white font-bold flex items-center z-50">
                        <p className="mx-3">
                            Warning: JavaScript is not enabled.{" "}
                            <span className="font-light">This website may not look or function as intended.</span>
                        </p>
                    </div>
                </noscript>
                <TreeStatusProvider>
                    <IndicatorPositionProvider>
                        <AnimationWrapper>{children}</AnimationWrapper>
                    </IndicatorPositionProvider>
                </TreeStatusProvider>
            </body>
        </html>
    );
}
