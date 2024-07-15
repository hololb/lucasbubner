"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

interface RepoInfo {
    name: string;
    language: string;
    url: string;
}

interface ActiveItem {
    info: RepoInfo;
    uuid: string;
}

/**
 * Return all public repos associated with @bubner and parse to format <user>/<repo> and with the mainly used language.
 * @author Lucas Bubner, 2024
 */
function fetchAPIData() {
    return new Promise<RepoInfo[]>(async (resolve, reject) => {
        try {
            // GitHub repo sources to use as part of the data
            const urls = [
                "https://api.github.com/users/bubner/repos",
                "https://api.github.com/users/Murray-Bridge-Bunyips/repos",
            ];

            const responses = await Promise.all(urls.map((url) => fetch(url)));
            const jsonData = await Promise.all(
                responses.map((response) => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.json();
                })
            );

            const repos: RepoInfo[] = [];
            jsonData.forEach((repoArray) => {
                repoArray.forEach((repoData: any) => {
                    // Don't count it if it's archived or under a org .github or is my README repo
                    if (!repoData.archived && ![".github", "bubner"].includes(repoData.name)) {
                        // Rename Unity-only languages to C# + Unity for clarity
                        const lang = ["ShaderLab", "HLSL"].includes(repoData.language)
                            ? "C# (Unity)"
                            : repoData.language;
                        repos.push({ name: repoData.full_name, language: lang, url: repoData.html_url });
                    }
                });
            });

            resolve(repos);
        } catch (error) {
            reject(`Failed to fetch repositories: ${error}`);
        }
    });
}

/**
 * Represents an item that will travel up the screen and callback when completed.
 * @author Lucas Bubner, 2024
 */
const Item = memo(({ info, callback }: { info: RepoInfo; callback: () => void }) => (
    <Link href={info.url} target="_blank">
        <motion.div
            className="absolute bottom-0 left-0 bg-black/50 rounded-2xl p-3 flex flex-col gap-2 hover:bg-black transition-colors text-center duration-500"
            // Spawn at a random x position to introduce some variety
            initial={{ opacity: 0, bottom: 0, left: Math.random() * 90 + "%" }}
            animate={{ opacity: 1, bottom: "100%" }}
            transition={{ bottom: { duration: 15 }, opacity: { duration: 1 } }}
            onAnimationComplete={callback}
        >
            <span className="text-blue-500 underline">{info.name}</span>
            <div className="text-white"><span className="text-white">{info.language}</span></div>
        </motion.div>
    </Link>
));
Item.displayName = "RepoItem";

/**
 * Home page display component of GitHub repository names.
 * @author Lucas Bubner, 2024
 */
export default function GitHubRepoTree() {
    const [repoList, setRepoList] = useState<RepoInfo[]>([]);
    const [items, setItems] = useState<ActiveItem[]>([]);
    const repos = useMemo(() => fetchAPIData(), []);

    useEffect(() => {
        repos.then((data) => setRepoList(data)).catch((e) => console.error(e));
    }, [repos]);

    useEffect(() => {
        // Spawn every 3 seconds
        const id = setInterval(() => {
            // Find items that are not already out there and add a random one
            const birb = repoList.filter((waiting) => items.findIndex((item) => item.info === waiting) === -1);
            if (birb.length === 0) return;
            const floor = Math.floor(Math.random() * birb.length);
            addItem(birb[floor]);
        }, 3000);

        return () => clearInterval(id);
    }, [repoList, items]);

    function addItem(item: RepoInfo) {
        setItems((curr) => [...curr, { info: item, uuid: v4() }]);
    }

    function removeItem(uuid: string) {
        setItems((curr) => curr.filter((item) => item.uuid !== uuid));
    }

    return repoList.length > 0 ? (
        <div className="h-[33vh] w-full">
            {items.map((item, _) => (
                <Item key={item.uuid} info={item.info} callback={() => removeItem(item.uuid)} />
            ))}
        </div>
    ) : (
        <div className="border border-white/25 px-1 w-full" />
    );
}
