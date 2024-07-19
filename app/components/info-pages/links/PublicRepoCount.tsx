/**
 * Fetch the number of public repositories for @bubner on GitHub.
 * @author Lucas Bubner, 2024
 */
export default async function PublicRepoCount() {
    const repos = await fetch("https://api.github.com/users/bubner").then((res) => {
        if (!res.ok) {
            console.error("Cannot retrieve public repo count for @bubner. HTTP: " + res.status);
            return;
        }
        return res.json();
    });

    return repos ? (
        <p>
            My software projects in over <b className="__text-emp-red">{repos.public_repos}</b> repositories.
        </p>
    ) : (
        <p>My software projects and code repositories.</p>
    );
}
