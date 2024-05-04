/**
 * Router module to handle switching between webpages
 * @author Lucas Bubner, 2023
 */
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GotoContext } from "./components/GotoContext";
import Landing from "./landing/Landing";
import Home from "./pages/Home";
import Accomplishments from "./pages/content/Accomplishments";
import Technology from "./pages/content/Technology";
import Honourables from "./pages/content/Honourables";
import Projects from "./pages/content/Projects";
import Links from "./pages/content/Links";

function Router() {
    const location = useLocation();
    const [lock, setLock] = useState(false);
    const nav = useNavigate();

    function goto(path: string) {
        if (lock || path === location.pathname) return;
        nav(path);
    }

    useEffect(() => {
        const root = document.getElementById("root");

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node as HTMLElement;
                        // If the user moves through the pages, there might be a third content page that will be removed from the DOM
                        // during the transition, therefore, we check if there are two content pages in the DOM and cancel if there are
                        if (el.id === "content" && document.querySelectorAll("#content").length === 1) {
                            // Restore navigation when the page is removed from the DOM
                            // This eliminates most transitionary bugs without having to impose a mandatory fixed timeout
                            setLock(false);
                            document.querySelector("html")!.style.overflowY = "auto";
                        }
                    }
                });
            });
        });

        observer.observe(root!, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // Without this lock, framer-motion will position the page incorrectly and leave the content 1vh too low
        setLock(true);
        document.querySelector("html")!.style.overflowY = "hidden";

        // The listener for the DOM will automatically unlock the page when the transitionary content is removed from the DOM
        // This timeout is a failsafe to ensure that the page is unlocked if the DOM listener fails or is not triggered
        // A common situation where the DOM listener fails is when the user initially lands on the page
        setTimeout(() => {
            setLock(false);
            document.querySelector("html")!.style.overflowY = "auto";
        }, 2000);
    }, [location.pathname]);

    function serveRedirector() {
        // Redirect all requests to /serve/* to serve.bubner.me/*
        const href = `https://serve.bubner.me/${location.pathname.split("/serve/")[1] ?? ""}${location.search}${
            location.hash
        }`;
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    color: "white",
                    backgroundColor: "black",
                }}
            >
                <meta httpEquiv="refresh" content={`0;url=${href}`} />
                <div style={{ position: "absolute", bottom: 0, padding: "12px" }}>
                    Redirecting you to <a href={href} style={{ color: "rgb(59, 130, 246)" }}>{href}</a> <span id="autobuf">...</span>
                </div>
            </div>
        );
    }

    return (
        <GotoContext.Provider value={goto}>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/serve/*" element={serveRedirector()} />
                    <Route path="/">
                        <Route index element={<Landing />} />
                    </Route>
                    <Route path="/~">
                        <Route index path="*" element={<Navigate to="/~" />} />
                        <Route path="" element={<Home />} />
                        <Route path="accomplishments" element={<Accomplishments />} />
                        <Route path="technology" element={<Technology />} />
                        <Route path="honourables" element={<Honourables />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="links" element={<Links />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AnimatePresence>
        </GotoContext.Provider>
    );
}

export default Router;
