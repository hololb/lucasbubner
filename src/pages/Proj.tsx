/**
 * My worked on projects display page.
 * @author Lucas Bubner, 2023
 */
import PageWrapper from "../PageWrapper";
import "./Boxes.css";

function Proj() {
    return (
        <PageWrapper>
            <div className="content-bg" />
            <div className="container no-mid">
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/rre.png')", backgroundSize: "50%" }}
                    href="https://github.com/hololb/RoboRegistry/"
                    target="_blank"
                >
                    <h1>RoboRegistry</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>digital registrar</b> for FIRST scrimmage event coordinators to handle school and entity
                        registration and manage logistics with <b>event registration</b> and <b>QR code check-ins</b>. Built with <b>Flask</b> and <b>Firebase</b>.
                    </p>
                </a>
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/bunyipsc.png')", backgroundSize: "40%" }}
                    href="https://github.com/Murray-Bridge-Bunyips/BunyipBellower"
                    target="_blank"
                >
                    <h1>Bunyip Bellower</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>real-time</b> Firebase chat application built for the members of the Murray Bridge Bunyips. Built
                        in <b>React</b> and <b>TypeScript</b>. Winner of the <b>2023 Australian SA/NT iAwards</b> for
                        the Student & Education category.
                    </p>
                </a>
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/bunyipst.png')", backgroundSize: "40%" }}
                    href="https://github.com/Murray-Bridge-Bunyips/BunyipsFTC/"
                    target="_blank"
                >
                    <h1>BunyipsFTC</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        Java/Kotlin project containing contributed code used for the Bunyips team robots; contributed <b>SDK abstraction </b>
                        to make programming robot code faster and more <b>educational for new programmers</b>.
                    </p>
                </a>
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/fchess.png')", backgroundSize: "40%" }}
                    href="https://github.com/hololb/FusionChess/"
                    target="_blank"
                >
                    <h1>Fusion Chess</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A playable <b>custom chess variant</b> that changes the rules of the game to include <b>piece fusion </b>
                        instead of capturing. Built in <b>React</b> and <b>TypeScript</b>.
                    </p>
                </a>
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/ceo.png')", backgroundSize: "40%" }}
                    href="https://github.com/hololb/Mind/"
                    target="_blank"
                >
                    <h1>Mind</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        A <b>Flask</b> adventure game with over 65 endings, featuring <b>autosaving</b> savestates, <b>sessions</b>, and
                        password protection.
                    </p>
                </a>
                <a
                    className="box clk"
                    style={{ backgroundImage: "url('/transparent.png')", backgroundSize: "40%" }}
                    href="https://github.com/hololb/lucasbubner/"
                    target="_blank"
                >
                    <h1>lucasbubner v2</h1>
                    <span className="clicknoti">(click)</span>
                    <p>
                        This very website! Built in <b>React</b> and <b>TypeScript</b>, using features from <b>react-router</b> and
                        <b> framer-motion</b>.
                    </p>
                </a>
            </div>
        </PageWrapper>
    );
}

export default Proj;
