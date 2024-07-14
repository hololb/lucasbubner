import Box from "@/app/components/info-pages/Box";
import { Bubner, BunyipBellower, FusionChess, RoboRegistry, RoboticsLogos, Serve } from "@/app/images";

export const metadata = { title: "Lucas Bubner • Projects" };

/**
 * Featured software projects.
 * @author Lucas Bubner, 2024
 */
export default function Projects() {
    return (
        <>
            <Box src={RoboticsLogos} size={80} href="https://github.com/Murray-Bridge-Bunyips/BunyipsLib/">
                <h1>BunyipsLib</h1>
                <span className="__clk">(click)</span>
                <p>
                    A <b>custom FIRST Tech Challenge library</b>, providing <b>powerful</b> developer tools and{" "}
                    <b>abstractions</b> for FTC robot programming. Built in <b>Java</b> and <b>Kotlin</b>.{" "}
                    <b>Free & Open Source</b>, <b>documentation-rich</b>, and <b>expansible</b>.
                </p>
            </Box>
            <Box src={RoboRegistry} size={45} href="https://github.com/bubner/RoboRegistry/" extrablur>
                <h1>RoboRegistry</h1>
                <span className="__clk">(click)</span>
                <p>
                    A <b>digital registrar</b> for FIRST scrimmage event coordinators to handle school and entity
                    registration and manage logistics with <b>event registration</b> and <b>QR code check-ins</b>. Built
                    with <b>Flask</b> and <b>Firebase</b>.
                </p>
            </Box>
            <Box src={BunyipBellower} size={45} href="https://github.com/Murray-Bridge-Bunyips/BunyipBellower">
                <h1>Bunyip Bellower</h1>
                <span className="__clk">(click)</span>
                <p>
                    A <b>real-time</b> Firebase chat application built for the members of the Murray Bridge Bunyips.
                    Built in <b>React</b> and <b>TypeScript</b>. Winner of the <b>2023 Australian SA/NT iAwards </b>
                    for the Student &amp; Education category.
                </p>
            </Box>
            <Box src={Serve} size={85} href="https://serve.bubner.me">
                <h1>Serve</h1>
                <span className="__clk">(click)</span>
                <p>
                    A custom-built <b>Next.js</b> application for small projects and web applications to be hosted on a
                    single domain, used primarily for <b>personal projects</b>, school assignments, and{" "}
                    <b>prototypes</b>.
                </p>
            </Box>
            <Box src={FusionChess} size={40} href="https://github.com/bubner/FusionChess/">
                <h1>Fusion Chess</h1>
                <span className="__clk">(click)</span>
                <p>
                    A playable <b>custom chess variant</b> that changes the rules of the game to include
                    <b> piece fusion</b> instead of capturing. Built in <b>React</b> and <b>TypeScript</b>.
                </p>
            </Box>
            <Box src={Bubner} size={45} href="https://github.com/bubner/lucasbubner/" extrablur>
                <h1>lucasbubner v2.1</h1>
                <span className="__clk">(click)</span>
                <p>
                    This very website, revamped to use <b>Next.js 14</b>, <b>framer-motion</b>, and <b>Tailwind CSS</b>.
                    Hosted on <b>Vercel</b> via my <b>personal domain</b>.
                </p>
            </Box>
        </>
    );
}
