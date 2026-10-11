// Public endpoints of the projects hosted on Dokploy (personal + Aresis).
// Staging/test environments and private tools are left out on purpose.
// The cave game demo is too: it sends `Cross-Origin-Resource-Policy: same-origin`
// (needed for Unity WebGL), so browsers block any cross-origin check of it.
export interface StatusService {
  name: string;
  url: string;
}

export interface StatusGroup {
  project: string;
  services: StatusService[];
}

export const statusGroups: StatusGroup[] = [
  {
    project: "Aresis",
    services: [
      { name: "Website", url: "https://aresis.nl" },
      { name: "API", url: "https://api.aresis.nl/health" },
      { name: "MCP server", url: "https://mcp.aresis.nl" },
    ],
  },
  {
    project: "ManyVoiced",
    services: [{ name: "Website", url: "https://manyvoiced.com" }],
  },
  {
    project: "Superelf Football Pool",
    services: [{ name: "Website", url: "https://superelf.yorickteriele.nl" }],
  },
  {
    project: "Trading Bot",
    services: [{ name: "Dashboard", url: "https://trading.yorickteriele.nl" }],
  },
];
