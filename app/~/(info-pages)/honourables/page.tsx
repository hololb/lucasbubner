import Box from "@/app/components/info-pages/Box";
import entryIncrement from "@/app/components/info-pages/entry-timing";
import { Bunyips, Harvard, iAwards, MBHS, RoboRoos } from "@/app/images";
import Link from "next/link";

export const metadata = { title: "Lucas Bubner • Honourables" };

/**
 * Honourables and awards pages.
 * @author Lucas Bubner, 2024
 */
export default function Honourables() {
    const iter = entryIncrement(0.2);
    return (
        <>
            <Box src={iAwards} size={50} entryDelay={iter.next().value}>
                <h1>SA/NT iAwards Winner</h1>
                <p>
                    <b>Australian Information Industry Association</b> <br /> <b>Winner</b> of the 2023 SA/NT Student
                    &amp; Education category at the iAwards, developing the Bunyip Bellower project.
                    <br />
                    <Link
                        className="__link"
                        href="https://www.murraybridge.news/p/murray-bridge-high-school-students"
                        target="_blank"
                    >
                        https://www.murraybridge.news/p/murray-bridge-high-school-students
                    </Link>
                </p>
            </Box>
            <Box src={Harvard} size={40} extrablur entryDelay={iter.next().value}>
                <h1>CS50 Certificate</h1>
                <p>
                    <b>CS50's Introduction to Computer Science Certificate</b> <br /> Attained in
                    <b> December 2022</b> for successful completion of <b>CS50x</b> offered by Harvard University.
                    <br />
                    <Link
                        className="__link"
                        href="https://cs50.harvard.edu/certificates/62d6f9dd-7d87-49a0-a437-f6cd334cdc45"
                        target="_blank"
                    >
                        https://cs50.harvard.edu/certificates/62d6f9dd-7d87-49a0-a437-f6cd334cdc45
                    </Link>
                </p>
            </Box>
            <Box src={iAwards} size={50} entryDelay={iter.next().value}>
                <h1>National iAwards Merit</h1>
                <p>
                    <b>Australian Information Industry Association</b> <br /> <b>Merit recipient</b> of the 2023 Student
                    &amp; Education category at the <b>national iAwards</b>, undergoing Stage II judging against other
                    prestigious projects at a <b>tertiary level</b>.
                    <br />
                    <Link
                        className="__link"
                        href="https://www.linkedin.com/feed/update/urn:li:activity:7106212481345212417/"
                        target="_blank"
                    >
                        https://www.linkedin.com/feed/update/urn:li:activity:7106212481345212417/
                    </Link>
                </p>
            </Box>
            <Box src={MBHS} size={70} entryDelay={iter.next().value}>
                <h1>Academic Excellence</h1>
                <p>
                    <b>Murray Bridge High School</b> <br /> <b>Multi-year</b> Dux student at MBHS; highest achieving
                    <b> academic student</b> for grade point average across multiple years. Striving student in
                    <b> Specialist and Methods Mathematics</b>, <b>Physics</b>, and <b>Digital Technology</b>.
                </p>
            </Box>
            <Box src={Bunyips} size={45} entryDelay={iter.next().value}>
                <h1>MBHS Robotics Captain</h1>
                <p>
                    <b>May 2022 - Present</b> <br /> Club captain of the <b>FIRST Tech Challenge</b> MBHS Student
                    Robotics Club. Pushed <b>new frontiers</b> in both <b>software programming</b> and{" "}
                    <b>community outreach</b>, bringing us to Sydney for the 2023 <b>National Championship</b>.
                    <br />
                    <Link
                        className="__link"
                        href="https://www.murraybridge.news/p/robotics-students-are-on-a-roll-at"
                        target="_blank"
                    >
                        https://www.murraybridge.news/p/robotics-students-are-on-a-roll-at
                    </Link>
                </p>
            </Box>
            <Box src={RoboRoos} size={45} entryDelay={iter.next().value}>
                <h1>RoboRoos FRC Student</h1>
                <p>
                    <b>2024 CRESCENDO</b> <br />
                    Member of the <b>4537 RoboRoos</b> FIRST Robotics Competition team, participating as a remote
                    software contributor.
                    <b> Developed</b> skills in <b>command-based</b> and <b>functional</b> programming paradigms, as
                    well as sustainable
                    <b> software architecture</b> practices.
                </p>
            </Box>
        </>
    );
}
