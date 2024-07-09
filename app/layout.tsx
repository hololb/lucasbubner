import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
    return (
        <html lang="en">
            <head>
                <Script
                    async
                    data-pace-options='{"eventLag": false, "restartOnRequestAfter": false}'
                    src="/external/pace.min.js"
                />
                <meta name="darkreader-lock" />
            </head>
            <body className={`${inter.className} bg-black`}>
                <noscript>
                    <div className="fixed bottom-0 w-screen h-9 bg-red-600 text-white font-bold flex items-center">
                        <p className="mx-3">
                            Warning: JavaScript is not enabled.{" "}
                            <span className="font-light">This website may not look or function as intended.</span>
                        </p>
                    </div>
                </noscript>
                {children}
            </body>
        </html>
    );
}
