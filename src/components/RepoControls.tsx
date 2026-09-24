export type SortOption =
  | "stars-desc"
  | "stars-asc"
  | "name-asc";

type RepoControlsProps = {
  searchTerm: string;
  sortBy: SortOption;
  onSearchTermChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
};

export function RepoControls({
  searchTerm,
  sortBy,
  onSearchTermChange,
  onSortChange,
}: RepoControlsProps) {
  function handleSortChange(value: string) {
    if (
      value === "stars-desc" ||
      value === "stars-asc" ||
      value === "name-asc"
    ) {
      onSortChange(value);
    }
  }

  return (
    <div className="repo-controls">
      <label
        className="sr-only"
        htmlFor="repo-filter"
      >
        Filter repositories
      </label>

      <input
        id="repo-filter"
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchTermChange(event.target.value)
        }
        placeholder="Find a repository..."
      />

      <label
        className="sr-only"
        htmlFor="repo-sort"
      >
        Sort repositories
      </label>

      <select
        id="repo-sort"
        value={sortBy}
        onChange={(event) =>
          handleSortChange(event.target.value)
        }
      >
        <option value="stars-desc">
          Stars (descending)
        </option>

        <option value="stars-asc">
          Stars (ascending)
        </option>

        <option value="name-asc">
          Alphabetical (A-Z)
        </option>
      </select>
    </div>
  );
}