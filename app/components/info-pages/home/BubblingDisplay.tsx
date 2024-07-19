"use client";

import {
    Python,
    JavaCup,
    TypeScript,
    Unity,
    JavaScript,
    HTMLBadge,
    CPlusPlus,
    CSharp,
    Kotlin,
    Tag,
} from "@/app/images";
import { StaticImageData } from "next/image";
import { RepoInfo } from "./GitHubRepoTree";
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import Image from "next/image";
import SoundLink from "../../SoundLink";
import { v4 } from "uuid";

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
 * Bubbling animation for GitHub repo data.
 * @see GitHubRepoTree.tsx
 * @author Lucas Bubner, 2024
 */
export default function BubblingDisplay({ repos }: { repos: RepoInfo[] }) {
    const [items, setItems] = useState<ActiveItem[]>([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [repos]);

    useEffect(() => {
        // Spawn every 3 seconds
        const id = setInterval(() => {
            // Find items that are not already out there and add a random one
            const birb = repos.filter((waiting) => items.findIndex((item) => item.info === waiting) === -1);
            if (birb.length === 0) return;
            const floor = Math.floor(Math.random() * birb.length);
            addItem(birb[floor]);
        }, 3000);

        return () => clearInterval(id);
    }, [repos, items]);
    ``;

    function addItem(item: RepoInfo) {
        setItems((curr) => [...curr, { info: item, seed: Math.random() >= 0.5, uuid: v4() }]);
    }

    function removeItem(uuid: string) {
        setItems((curr) => curr.filter((item) => item.uuid !== uuid));
    }

    return repos.length > 0 ? (
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
