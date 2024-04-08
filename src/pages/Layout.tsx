/**
 * Page wrapper to support Navbar and Framer Motion compatibility.
 * @author Lucas Bubner, 2023
 */
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
    function onLoad() {
        // DOM takes some time to update even after framer-motion says the animation is complete, so
        // we must wait a bit, so we don't calculate leaving boxes
        setTimeout(() => {
            const boxHeights: Array<number> = Array.from(document.getElementsByClassName("box")).map(
                (el) => (el as HTMLDivElement).getBoundingClientRect().height
            );
            const tallestBox = Math.max(...boxHeights);
            Array.from(document.getElementsByClassName("box")).forEach((el) => {
                // Don't resize box elements intended to be small
                if (el.classList.contains("bsm")) return;
                (el as HTMLDivElement).style.height = `${tallestBox}px`;
            });
        }, 100);
        // Reset scroll position for mobile devices
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const allBoxes = Array.from(document.getElementsByClassName("box"));
        // Dynamic hover blur for background images
        allBoxes.forEach((el) => {
            const box = el as HTMLDivElement;
            const bog = box.querySelector(".bog") as HTMLDivElement;
            box.addEventListener("mouseover", () => {
                bog?.style.setProperty("filter", "blur(5px)");
            });
            box.addEventListener("mouseout", () => {
                if (bog?.classList.contains("inc")) {
                    bog.style.setProperty("filter", "blur(3px)");
                    return;
                }
                bog?.style.setProperty("filter", "blur(1px)");
            });
        });
    }, []);

    return (
        <motion.div
            id="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => onLoad()}
            style={{ willChange: "opacity" }}
        >
            <Navbar />
            {children}
        </motion.div>
    );
}

export default Layout;
