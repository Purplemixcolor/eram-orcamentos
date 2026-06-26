import type { NextConfig } from "next";

const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/eram-orcamentos" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
