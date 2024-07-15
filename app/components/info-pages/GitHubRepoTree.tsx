"use client";

import { motion } from "framer-motion";

/**
 * Home page display component of GitHub repository names.
 * @author Lucas Bubner, 2024
 */
export default function GitHubRepoTree() {
    return (
        <motion.div
            className="__box"
            initial={{ opacity: 0, y: "90%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
        >
            TODO
        </motion.div>
    );
}
