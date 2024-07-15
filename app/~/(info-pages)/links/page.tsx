import Box from "@/app/components/info-pages/Box";
import entryIncrement from "@/app/components/info-pages/entry-timing";
import PublicRepoCount from "@/app/components/info-pages/PublicRepoCount";
import { GitHubBubner, GitHubDark, Instagram, LinkedIn, LinkedInBubner, Proton, Replit, WakaTime } from "@/app/images";
import Image from "next/image";

export const metadata = { title: "Lucas Bubner • Links" };

/**
 * Links and contact information.
 * @author Lucas Bubner, 2024
 */
export default function Links() {
    const iter = entryIncrement(0.3);
    return (
        <div className="flex flex-col">
            <div className="md:flex">
                <Box src={GitHubDark} size={170} href="https://github.com/bubner/" entryDelay={iter.next().value}>
                    <h1 className="flex justify-center items-center flex-col gap-1">
                        GitHub
                        <Image alt="Lucas Bubner on GitHub" className="rounded h-[28px] w-auto" src={GitHubBubner} />
                    </h1>
                    <span className="__clk">(click)</span>
                    <p className="small">
                        <PublicRepoCount />
                    </p>
                </Box>
                <Box src={WakaTime} size={50} href="https://wakatime.com/@bubner" entryDelay={iter.next().value}>
                    <h1 className="flex justify-center items-center flex-col gap-1">
                        WakaTime
                        <Image
                            className="rounded"
                            src="https://wakatime.com/badge/user/617e18c7-273e-4a36-be73-e7a0d8b31d1b.svg?style=for-the-badge"
                            alt="Total time coded since Jun 30 2023"
                            height={30}
                            width={260}
                            unoptimized
                        />
                    </h1>
                    <span className="__clk">(click)</span>
                    <p className="small">My programming statistics since July 2023.</p>
                </Box>
                <Box src={LinkedIn} size={36} href="https://linkedin.com/in/bubner/" entryDelay={iter.next().value}>
                    <h1 className="flex justify-center items-center flex-col gap-1">
                        LinkedIn
                        <Image
                            alt="Lucas Bubner on LinkedIn"
                            className="rounded h-[28px] w-auto"
                            src={LinkedInBubner}
                        />
                    </h1>
                    <span className="__clk">(click)</span>
                    <p className="small">My industry certifications and experiences.</p>
                </Box>
            </div>
            <div className="md:flex w-full">
                <Box
                    src={Proton}
                    size={20}
                    href={"mailto:bubner@p" + "roton.me"}
                    small
                    className="w-full"
                    entryDelay={iter.next().value}
                >
                    <h1>Contact Email</h1>
                    <span className="__clk">(click)</span>
                </Box>
                <Box
                    src={Replit}
                    size={20}
                    href="https://replit.com/@LUCASBUBNER"
                    small
                    className="w-full"
                    entryDelay={iter.next().value}
                >
                    <h1>Replit</h1>
                    <span className="__clk">(click)</span>
                </Box>
                <Box
                    src={Instagram}
                    size={12}
                    href="https://www.instagram.com/lucas.kbubner/"
                    small
                    className="w-full"
                    entryDelay={iter.next().value}
                >
                    <h1>Instagram</h1>
                    <span className="__clk">(click)</span>
                </Box>
            </div>
        </div>
    );
}
