import type { NextConfig } from "next";

// Define o nome do seu repositório
const repo = 'portfolio';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
};

export default nextConfig;
