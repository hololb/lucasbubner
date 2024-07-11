import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnimationWrapper from "./components/exit/AnimationWrapper";

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
    // While this is a SSR supported application layout, the reliance on JavaScript is still very high and not many things
    // (if any) work without it, so we'll add a noscript warning then assume JavaScript is enabled from there onwards.
    // The app could possibly be changed in the future to be more static rather than relying fully on JavaScript.
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
                <noscript>
                    <div className="fixed bottom-0 w-screen h-9 bg-red-600 text-white font-bold flex items-center">
                        <p className="mx-3">
                            Warning: JavaScript is not enabled.{" "}
                            <span className="font-light">This website may not look or function as intended.</span>
                        </p>
                    </div>
                </noscript>
                <AnimationWrapper>{children}</AnimationWrapper>
            </body>
        </html>
    );
}
