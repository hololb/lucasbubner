"use client";

import {
    CPlusPlus,
    CSharp,
    HTMLBadge,
    JavaCup,
    JavaScript,
    Kotlin,
    Python,
    Tag,
    TypeScript,
    Unity,
} from "@/app/images";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import SoundLink from "../SoundLink";
import { memo, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";

interface RepoInfo {
    name: string;
    language: string;
    url: string;
}

interface ActiveItem {
    info: RepoInfo;
    seed: boolean;
    uuid: string;
}

/**
 * Maps GitHub provided language names to icons.
 */
const imageMap: Map<string, StaticImageData> = new Map([
    ["Python", Python],
    ["Java", JavaCup],
    ["TypeScript", TypeScript],
    ["C# (Unity)", Unity],
    ["JavaScript", JavaScript],
    ["HTML", HTMLBadge],
    ["C++", CPlusPlus],
    ["C#", CSharp],
    ["Kotlin", Kotlin],
]);

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
                        // Rename Unity-only languages to C# + Unity for clarity and Jinja to Python
                        let lang: string;
                        switch (repoData.language) {
                            case "ShaderLab":
                            case "HLSL":
                                lang = "C# (Unity)";
                                break;
                            case "Jinja":
                                lang = "Python";
                                break;
                            default:
                                lang = repoData.language;
                                break;
                        }
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
const Item = memo(
    ({ info, renderLeftSide, callback }: { info: RepoInfo; renderLeftSide: boolean; callback: () => void }) => {
        const initialPosition = renderLeftSide
            ? { left: Math.random() * 50 + "%" }
            : { right: Math.random() * 50 + "%" };
        return (
            <SoundLink href={info.url} target="_blank">
                <motion.div
                    className="absolute bottom-0 bg-black/50 rounded-2xl p-3 flex flex-col gap-2 hover:bg-black transition-colors text-center duration-500"
                    // Spawn at a random x position to introduce some variety
                    initial={{ ...{ opacity: 0, bottom: 0 }, ...initialPosition }}
                    animate={{ opacity: 1, bottom: "100%" }}
                    transition={{ bottom: { duration: 15 }, opacity: { duration: 1 } }}
                    onAnimationComplete={callback}
                >
                    <span className="text-blue-500 underline">{info.name}</span>
                    <div className="flex gap-2 items-center justify-center">
                        <Image src={imageMap.get(info.language) || Tag} width={20} height={20} alt={info.language} />
                        <span className="text-white">{info.language}</span>
                    </div>
                </motion.div>
            </SoundLink>
        );
    }
);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
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
        setItems((curr) => [...curr, { info: item, seed: Math.random() >= 0.5, uuid: v4() }]);
    }

    function removeItem(uuid: string) {
        setItems((curr) => curr.filter((item) => item.uuid !== uuid));
    }

    return repoList.length > 0 ? (
        <div className="h-[33vh] w-full">
            {items.map((item, _) => (
                <Item
                    renderLeftSide={item.seed}
                    key={item.uuid}
                    info={item.info}
                    callback={() => removeItem(item.uuid)}
                />
            ))}
        </div>
    ) : (
        <div className="border border-white/25 px-1 w-full" />
    );
}
