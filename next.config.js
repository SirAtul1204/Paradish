const { config } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
