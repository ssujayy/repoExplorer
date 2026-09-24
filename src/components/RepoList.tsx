import type { Repository } from "../types/github";
import { RepoCard } from "./RepoCard";

type RepoListProps = {
  repos: Repository[];
};

export function RepoList({ repos }: RepoListProps) {
  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}