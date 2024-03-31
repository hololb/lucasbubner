/**
 * My social links display page.
 * @author Lucas Bubner, 2023
 */
import Layout from "../Layout";
import Box from "../../components/Box";
import "../../css/Boxes.css";

function Links() {
    document.title = "Lucas Bubner • Links";
    return (
        <Layout>
            <div className="content-bg" />
            <div className="container no-mid">
                <Box src="/github.svg" size={170} href="https://github.com/bubner/">
                    <h1 className="dflex-center col" style={{ gap: "4px" }}>
                        GitHub
                        <a href="https://github.com/bubner"><img className="rounded" src="/atbubner.png" style={{ height: "28px" }} /></a>
                    </h1>
                    <span className="clicknoti">(click)</span>
                    <p className="small">All my software projects and code repositories.</p>
                </Box>
                <Box src="/wakatime.svg" size={50} href="https://wakatime.com/@bubner">
                    <h1 className="dflex-center col" style={{ gap: "4px" }}>
                        WakaTime
                        <a href="https://wakatime.com/@bubner"><img className="rounded" src="https://wakatime.com/badge/user/617e18c7-273e-4a36-be73-e7a0d8b31d1b.svg?style=for-the-badge" alt="Total time coded since Jun 30 2023" /></a>
                    </h1>
                    <span className="clicknoti">(click)</span>
                    <p className="small">My programming statistics since July 2023.</p>
                </Box>
                <Box src="/linkedin.png" size={36} href="https://linkedin.com/in/bubner/">
                    <h1 className="dflex-center col" style={{ gap: "4px" }}>
                        LinkedIn
                        <a href="https://linkedin.com/in/bubner"><img className="rounded" src="/atme.png" style={{ height: "28px" }} /></a>
                    </h1>
                    <span className="clicknoti">(click)</span>
                    <p className="small">My industry certifications and experiences.</p>
                </Box>
                <Box
                    src="/proton.png"
                    size={20}
                    href="mailto:bubner@proton.me"
                    small
                    onClick={() => {
                        alert("bubner@proton.me");
                    }}
                >
                    <h1>Contact Email</h1>
                    <span className="clicknoti">(click)</span>
                </Box>
                <Box src="/insta.svg" size={12} href="https://www.instagram.com/lucas.kbubner/" small>
                    <h1>Instagram</h1>
                    <span className="clicknoti">(click)</span>
                </Box>
                <Box
                    src="/discord.svg"
                    size={20}
                    href="https://discord.com/users/616524858746077184/"
                    small
                    onClick={() => {
                        alert("username: holo" + "911");
                    }}
                >
                    <h1>Discord</h1>
                    <span className="clicknoti">(click)</span>
                </Box>
            </div>
        </Layout>
    );
}

export default Links;
