/**
 * My worked on projects display page.
 * @author Lucas Bubner, 2023
 */
import Layout from "../Layout";
import Box from "../../components/Box";
import "../../css/Boxes.css";

function Projects() {
    document.title = "Lucas Bubner • Projects";
    return (
        <Layout>
            <div className="content-bg" />
            <div className="container">
                <Box src="/bunyipst3n.png" size={80} href="https://github.com/Murray-Bridge-Bunyips/BunyipsLib/">
                    <h1>BunyipsLib</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>custom FIRST Tech Challenge library</b>, providing <b>powerful</b> developer tools and <b>abstractions</b> for FTC robot programming.
                        Built in <b>Java</b> and <b>Kotlin</b>. <b>Free & Open Source</b>, <b>documentation-rich</b>, and <b>expansible</b>.
                    </p>
                </Box>
                <Box src="/rr.png" size={45} href="https://github.com/bubner/RoboRegistry/" extrablur>
                    <h1>RoboRegistry</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>digital registrar</b> for FIRST scrimmage event coordinators to handle school and entity
                        registration and manage logistics with <b>event registration</b> and <b>QR code check-ins</b>.
                        Built with <b>Flask</b> and <b>Firebase</b>.
                    </p>
                </Box>
                <Box src="/bunyipsc.png" size={45} href="https://github.com/Murray-Bridge-Bunyips/BunyipBellower">
                    <h1>Bunyip Bellower</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>real-time</b> Firebase chat application built for the members of the Murray Bridge Bunyips.
                        Built in <b>React</b> and <b>TypeScript</b>. Winner of the <b>2023 Australian SA/NT iAwards </b>
                        for the Student &amp; Education category.
                    </p>
                </Box>
                <Box src="/bgdual.png" size={85} href="https://serve.bubner.me">
                    <h1>Serve</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A custom-built <b>Next.js</b> application for small projects and web applications to be hosted on a single domain,
                        used primarily for <b>personal projects</b>, school assignments, and <b>prototypes</b>.
                    </p>
                </Box>
                <Box src="/fchess.png" size={40} href="https://github.com/bubner/FusionChess/">
                    <h1>Fusion Chess</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A playable <b>custom chess variant</b> that changes the rules of the game to include
                        <b> piece fusion</b> instead of capturing. Built in <b>React</b> and <b>TypeScript</b>.
                    </p>
                </Box>
                <Box src="/transparent.png" size={45} href="https://github.com/bubner/lucasbubner/" extrablur>
                    <h1>lucasbubner v2</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        This very website, using <b>vanilla</b> CSS! Built in <b>React</b> and <b>TypeScript</b>, using minimal features from
                        <b> react-router</b> and <b>framer-motion</b>. Hosted on <b>Vercel</b> via my <b>personal domain</b>.
                    </p>
                </Box>
            </div>
        </Layout>
    );
}

export default Projects;
