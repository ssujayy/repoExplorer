import { useState } from "react";
import { getRepos } from "./api/github";
import { RepoControls } from "./components/RepoControls";
import type { SortOption } from "./components/RepoControls";
import { RepoList } from "./components/RepoList";
import { SearchBar } from "./components/SearchBar";
import type { Repository } from "./types/github";
import "./App.css";

function App() {
  const [usernameInput, setUsernameInput] = useState("");

  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedUsername, setSearchedUsername] =
    useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] =
    useState<SortOption>("stars-desc");

  async function handleSearch(username: string) {
    setLoading(true);
    setError(null);
    setRepos([]);
    setSearchTerm("");
    setSearchedUsername(username);

    try {
      const data = await getRepos(username);
      setRepos(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  const normalizedSearch = searchTerm
    .trim()
    .toLowerCase();

  const filteredRepos = repos.filter((repo) => {
    if (!normalizedSearch) {
      return true;
    }

    const name = repo.name.toLowerCase();
    const description =
      repo.description?.toLowerCase() ?? "";
    const language =
      repo.language?.toLowerCase() ?? "";

    return (
      name.includes(normalizedSearch) ||
      description.includes(normalizedSearch) ||
      language.includes(normalizedSearch)
    );
  });

  const visibleRepos = [...filteredRepos].sort(
    (a, b) => {
      if (sortBy === "stars-desc") {
        const difference =
          b.stargazers_count - a.stargazers_count;

        if (difference !== 0) {
          return difference;
        }
      }

      if (sortBy === "stars-asc") {
        const difference =
          a.stargazers_count - b.stargazers_count;

        if (difference !== 0) {
          return difference;
        }
      }

      return a.name.localeCompare(b.name);
    }
  );

  const trimmedUsernameInput = usernameInput.trim();

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">&lt;/&gt;</span>
          <span>GitHub Repository Explorer</span>
        </div>

        <span className="api-badge">
          GitHub REST API
        </span>
      </header>

      <main className="page">
        <section className="hero">
          <p className="terminal-label">
            {trimmedUsernameInput
              ? `~/github/${trimmedUsernameInput}/repos`
              : "~/github/repos"}
          </p>

          <h1>displayRepos</h1>

          <p className="hero-description">
            Enter a GitHub username, view their public repositories.
          </p>

          <SearchBar
            username={usernameInput}
            onUsernameChange={setUsernameInput}
            onSearch={handleSearch}
            loading={loading}
          />
        </section>

        <section
          className="results"
          aria-live="polite"
        >
          {loading && (
            <div className="status-box">
              <span className="loader" />

              <div>
                <strong>
                  Fetching repositories
                </strong>

                <p>
                  Looking through @
                  {searchedUsername}'s public projects...
                </p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="status-box error-box">
              <span className="status-icon">!</span>

              <div>
                <strong>Search failed</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            searchedUsername && (
              <>
                <div className="results-heading">
                  <div>
                    <p className="results-label">
                      repositories
                    </p>

                    <h2>
                      <a
                        className="profile-link"
                        href={`https://github.com/${encodeURIComponent(searchedUsername)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        @{searchedUsername} ↗
                      </a>
                    </h2>

                    <p className="repo-count">
                      {repos.length} public{" "}
                      {repos.length === 1
                        ? "repository"
                        : "repositories"}
                    </p>
                  </div>
                </div>

                {repos.length > 0 && (
                  <RepoControls
                    searchTerm={searchTerm}
                    sortBy={sortBy}
                    onSearchTermChange={
                      setSearchTerm
                    }
                    onSortChange={setSortBy}
                  />
                )}

                {repos.length === 0 ? (
                  <div className="empty-state">
                    <strong>
                      No public repositories
                    </strong>

                    <p>
                      This GitHub user doesn't have any
                      public repositories yet.
                    </p>
                  </div>
                ) : visibleRepos.length === 0 ? (
                  <div className="empty-state">
                    <strong>
                      No matches found
                    </strong>

                    <p>
                      Try a different repository name,
                      description, or language.
                    </p>
                  </div>
                ) : (
                  <RepoList
                    repos={visibleRepos}
                  />
                )}
              </>
            )}
        </section>
      </main>

      <footer className="footer">
        Built with React, TypeScript, and the
        GitHub API.
      </footer>
    </div>
  );
}

export default App;