# RepoScope

RepoScope is a responsive GitHub repository explorer built with React and TypeScript. Enter a GitHub username to browse, search, and sort that user's public repositories.

## Features

* Search for any GitHub user's public repositories
* View repository names, descriptions, primary languages, star counts, and links
* Filter repositories by name, description, or language
* Sort repositories by:

  * Stars (descending)
  * Stars (ascending)
  * Alphabetical (A-Z)
* Direct links to repositories and the searched user's GitHub profile
* Loading, error, empty, and no-match states
* Pagination for users with more than 100 public repositories
* Responsive layout for desktop and mobile
* GitHub-inspired dark interface

## Tech Stack

* React
* TypeScript
* Vite
* GitHub REST API
* CSS

## Running Locally

Clone the repository and navigate into the project directory.

```bash
npm install
npm run dev
```

Vite will provide a local development URL in the terminal.

To create a production build:

```bash
npm run build
```

## Design Decisions

### GitHub-Inspired Interface

Because RepoScope displays GitHub repository data, the interface uses a visual language inspired by GitHub's dark theme. Repository rows, restrained borders, blue links, language indicators, and muted metadata make the application feel familiar while maintaining its own identity.

### Simple Component Architecture

The application separates responsibilities across a small set of components:

* `SearchBar` handles GitHub username input.
* `RepoControls` handles filtering and sorting.
* `RepoList` renders the repository collection.
* `RepoCard` displays individual repositories.
* `App` coordinates application state and data flow.

GitHub API logic is kept separately in `api/github.ts`, while API data types are defined in `types/github.ts`.

### Derived Repository Results

Filtered and sorted repositories are derived from the fetched repository data rather than stored as separate state. This avoids duplicated state and keeps the displayed results synchronized with the current filter and sort options.

### Public GitHub API Access

RepoScope uses unauthenticated requests to GitHub's public REST API because the application only reads publicly available repository information. This avoids exposing API credentials in client-side code.

The API request also handles pagination so users with more than 100 public repositories are not limited to the first page of results.

### Responsive Design

The interface uses custom CSS and responsive breakpoints rather than a component library. This keeps the dependency footprint small while allowing the interface to adapt directly to desktop and mobile layouts.

