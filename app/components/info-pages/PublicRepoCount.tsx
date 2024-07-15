"use client";

import { useEffect, useState } from "react";

/**
 * Fetch the number of public repositories for @bubner on GitHub.
 * @author Lucas Bubner, 2024
 */
export default function PublicRepoCount() {
    const [count, setCount] = useState<number | undefined>();

    useEffect(() => {
        fetch("https://api.github.com/users/bubner").then((res) => {
            if (!res.ok) {
                console.error("Cannot retrieve public repo count for @bubner. HTTP: " + res.status);
                return;
            }
            res.json().then((data) => setCount(data.public_repos));
        });
    }, []);

    return count ? (
        <>
            My software projects in over <b className="__text-emp-red">{count}</b> repositories.
        </>
    ) : (
        <>My software projects and code repositories.</>
    );
}
