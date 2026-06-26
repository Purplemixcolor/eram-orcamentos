import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/eram-orcamentos" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath || undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
