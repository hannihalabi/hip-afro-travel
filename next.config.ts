import type { NextConfig } from "next";

const repo = "hip-afro-travel";
const isProd = process.env.NODE_ENV === "production";
const isGitHubPagesBuild =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.DEPLOY_TARGET === "github-pages";
const useRepoPrefix = isProd && isGitHubPagesBuild;

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: { unoptimized: true },
  basePath: useRepoPrefix ? `/${repo}` : "",
  assetPrefix: useRepoPrefix ? `/${repo}/` : "",
  trailingSlash: true,
};

export default nextConfig;
