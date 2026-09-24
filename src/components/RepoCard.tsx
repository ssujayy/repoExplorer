import type { Repository } from "../types/github";

type RepoCardProps = {
  repo: Repository;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#663399",
  Shell: "#89e051",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
};

export function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language
    ? LANGUAGE_COLORS[repo.language] ?? "#8b949e"
    : null;

  return (
    <article className="repo-card">
      <div className="repo-card-header">
        <a
          className="repo-name"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          {repo.name}
        </a>

        <span className="stars">
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      <p className="repo-description">
        {repo.description ?? "No description provided."}
      </p>

      <div className="repo-footer">
        {repo.language && (
          <span className="language">
            <span
              className="language-dot"
              style={{ backgroundColor: languageColor ?? undefined }}
            />
            {repo.language}
          </span>
        )}

        <a
          className="repo-link"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View repository ↗
        </a>
      </div>
    </article>
  );
}