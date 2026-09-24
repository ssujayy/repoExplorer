import type { SubmitEvent } from "react";

type SearchBarProps = {
  username: string;
  onUsernameChange: (username: string) => void;
  onSearch: (username: string) => void;
  loading: boolean;
};

export function SearchBar({
  username,
  onUsernameChange,
  onSearch,
  loading,
}: SearchBarProps) {
  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      return;
    }

    onSearch(trimmedUsername);
  }

  return (
    <form
      className="username-form"
      onSubmit={handleSubmit}
    >
      <label
        className="sr-only"
        htmlFor="username"
      >
        GitHub username
      </label>

      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(event) =>
          onUsernameChange(event.target.value)
        }
        placeholder="Enter a GitHub username"
        autoComplete="off"
        spellCheck={false}
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}