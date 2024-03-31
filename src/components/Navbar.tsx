/**
 * Standard navigation module with page linking functionality for both mobile and desktop.
 * @author Lucas Bubner, 2023
 */
import { useRef, FC, useContext, Ref } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import { GotoContext } from "./GotoContext";
import "../css/Navbar.css";

function Navbar() {
    const tref = useRef<PopupActions>();
    const tclose = () => tref.current?.close();
    const location = useLocation();
    const goto = useContext(GotoContext);

    interface PathMap {
        alt: string;
        path: string;
    }

    interface Image extends PathMap {
        src: string;
    }

    interface NavbarImageProps {
        src: string;
        alt: string;
        path: string;
        location: {
            pathname: string;
        };
    }

    interface NavbarButtonProps {
        alt: string;
        path: string;
    }

    const images: Image[] = [
        { src: "/transparent.png", alt: "Home", path: "/~" },
        { src: "/star.svg", alt: "Accomplishments", path: "/~/accomplishments" },
        { src: "/scr.svg", alt: "Technology", path: "/~/technology" },
        { src: "/annoc.svg", alt: "Honourables", path: "/~/honourables" },
        { src: "/at.svg", alt: "Projects", path: "/~/projects" },
        { src: "/link.svg", alt: "Links", path: "/~/links" },
        { src: "/pfp.svg", alt: "Go to CV/Resume", path: "/serve/cv" },
    ];

    const buttons: PathMap[] = [
        { alt: "Home", path: "/~" },
        { alt: "Accomplishments", path: "/~/accomplishments" },
        { alt: "Technology", path: "/~/technology" },
        { alt: "Honourables", path: "/~/honourables" },
        { alt: "Projects", path: "/~/projects" },
        { alt: "Links", path: "/~/links" },
        { alt: "Go to CV/Resume", path: "/serve/cv" },
    ];

    const NavbarImage: FC<NavbarImageProps> = ({ src, alt, path, location }) => (
        <div className="navbar">
            <img
                onClick={() => goto(path)}
                className={location.pathname === path ? "navbar-img active" : "navbar-img"}
                src={src}
                alt={alt}
                title={alt}
            />
            {location.pathname === path ? <div id="locator" /> : null}
        </div>
    );

    const NavbarButton: FC<NavbarButtonProps> = ({ alt, path }) => (
        <button
            title={alt}
            onClick={() => {
                tclose();
                goto(path);
            }}
        >
            {alt}
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <div id="navbar">
                <div id="imagebuttons">
                    {images.map((image) => (
                        <NavbarImage
                            key={image.src}
                            src={image.src}
                            alt={image.alt}
                            path={image.path}
                            location={location}
                        />
                    ))}
                </div>
                <div id="mobileheader">
                    {/* Reused code from my Bunyip Bellower project. I couldn't be bothered implementing a new popup menu so this will do. */}
                    <Popup ref={tref as Ref<PopupActions>} trigger={<img src="/bbq.png" alt="Menu button" />}>
                        <>
                            <div className="outer" onClick={tclose} />
                            <div className="inner">
                                <div className="buttonarea">
                                    <p
                                        onClick={(e) => e.preventDefault()}
                                        style={{ textAlign: "center", fontStyle: "italic" }}
                                    >
                                        bubner.me
                                    </p>
                                </div>
                                {buttons.map((button, index) => (
                                    <div
                                        className="buttonarea"
                                        style={{ fontWeight: location.pathname === button.path ? "800" : "revert" }}
                                        key={index}
                                    >
                                        <NavbarButton key={button.alt} alt={button.alt} path={button.path} />
                                        {index !== buttons.length - 1 ? <hr /> : null}
                                    </div>
                                ))}
                            </div>
                        </>
                    </Popup>
                </div>
            </div>
        </motion.div>
    );
}

export default Navbar;
