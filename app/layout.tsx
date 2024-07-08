import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "pace-js/themes/red/pace-theme-flash.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lucas Bubner",
    description: "A young self-driven academic student and software developer.",
};

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
                    src="/pace.min.js"
                />
                <meta name="darkreader-lock" />
            </head>
            <body className={`${inter.className} bg-black`}>
                {children}
            </body>
        </html>
    );
}
