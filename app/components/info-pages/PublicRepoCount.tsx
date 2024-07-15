"use client";

import { useEffect, useState } from "react";

/**
 * Fetch the number of public repositories for @bubner on GitHub.
 * @author Lucas Bubner, 2024
 */
export default function PublicRepoCount() {
    const [count, setCount] = useState("...");

    useEffect(() => {
        fetch("https://api.github.com/users/bubner")
            .then((res) => res.json())
            .then((data) => setCount(data.public_repos));
    }, []);

    return <>{count}</>;
}
