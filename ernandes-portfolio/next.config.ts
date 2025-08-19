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

  images: {
    // ESSENCIAL para o next/image funcionar corretamente na exportação estática
    loader: 'custom',
    loaderFile: './src/components/Image/loader.ts',
  },
};

export default nextConfig;
