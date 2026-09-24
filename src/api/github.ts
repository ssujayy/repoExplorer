import type { Repository } from "../types/github";

const PER_PAGE = 100;

export async function getRepos(
  username: string
): Promise<Repository[]> {
  const repos: Repository[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${PER_PAGE}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2026-03-10",
        },
      }
    );

    if (response.status === 404) {
      throw new Error("GitHub user not found.");
    }

    if (
      (response.status === 403 || response.status === 429) &&
      response.headers.get("x-ratelimit-remaining") === "0"
    ) {
      throw new Error("API rate limit reached. Try again later.");
    }

    if (!response.ok) {
      throw new Error("Unable to fetch repositories.");
    }

    const pageRepos = (await response.json()) as Repository[];

    repos.push(...pageRepos);

    const linkHeader = response.headers.get("link");

    hasNextPage = linkHeader?.includes('rel="next"') ?? false;
    page += 1;
  }

  return repos;
}