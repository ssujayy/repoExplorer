export type Repository = {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    html_url: string;
}