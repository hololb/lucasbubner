/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wakatime.com",
                port: "",
                pathname: "/badge/user/*",
            },
        ],
    },
};

export default nextConfig;
