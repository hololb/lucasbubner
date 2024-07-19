import BubblingDisplay from "./BubblingDisplay";

export interface RepoInfo {
    name: string;
    language: string;
    url: string;
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
 * Home page display component of GitHub repository names.
 * @author Lucas Bubner, 2024
 */
export default async function GitHubRepoTree() {
    const repos = await fetchAPIData();
    return <BubblingDisplay repos={repos} />
}
