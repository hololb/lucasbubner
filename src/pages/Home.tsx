/**
 * Homepage component after initial landing
 * @author Lucas Bubner, 2023
 */
import { useEffect, useState } from "react";
import Layout from "./Layout";
import Box from "../components/Box";
import "../css/Boxes.css";
import { motion } from "framer-motion";

function Home() {
    const [publicRepos, setPublicRepos] = useState<number | undefined>(undefined);
    document.title = "Lucas Bubner • Home";

    // Ensure that the background image is loaded before displaying anything
    // We only have to do this on the main page as it will be the landing page and subsequently will be loaded after the main page
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = "/bg2.0b.png";
        img.onload = () => setLoaded(true);

        fetch("https://api.github.com/users/bubner")
            .then((res) => res.json())
            .then((data) => {
                setPublicRepos(data.public_repos + parseInt(import.meta.env.VITE_PRIVATE_REPO_COUNT ?? "0"));
            });
    }, []);

    return (
        <Layout>
            <div className={loaded ? "fade-in content-bg" : "fade-out content-bg"} />
            <div className="container">
                <div className="dflex-center realign" style={{ flexDirection: "column" }}>
                    <div className="box bsm fb-resize">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "90%", opacity: 0 }}
                            transition={{ delay: 1, duration: 2 }}
                            style={{ position: "absolute", border: "1px solid white" }}
                        />
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <img src="/transparent.png" style={{ width: "50px", height: "50px" }} />
                            <motion.div initial={{ y: "200%" }} animate={{ y: 0 }} transition={{ delay: 3 }}>
                                <strong id="autoscale" style={{ whiteSpace: "nowrap" }}>Lucas Bubner</strong>
                            </motion.div>
                            <a href="https://github.com/bubner?tab=repositories" target="_blank">
                                <span className="text-emp">{publicRepos !== undefined ? publicRepos : "..."}</span> repos
                            </a>
                        </div>
                    </div>
                    <motion.div
                        className="dflex-center realign"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 4 }}
                    >
                        <Box src={undefined} size={100} style={{ width: "100%" }}>
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                                Hi!
                            </motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                                I'm <b>Lucas Bubner</b>, a <b>16-year-old</b> software developer. <br /> I am currently
                                in high school as a<b> Year 11 student</b> passionate in the STEM/IT industries. This
                                website is a showcase of my work and achievements.
                            </motion.p>
                        </Box>
                        <Box src={undefined} size={80} style={{ width: "100%" }}>
                            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                                What I do
                            </motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                                I specialise in <b>software and academics</b>, consistently striving to exceed
                                expectations. I am highly <b>self-motivated</b>, always looking to learn and teach new
                                things in a range of IT industries.
                            </motion.p>
                        </Box>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
