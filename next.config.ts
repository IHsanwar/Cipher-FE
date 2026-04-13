import type { NextConfig } from "next";

if (
  typeof global.localStorage !== 'undefined' &&
  typeof global.localStorage.getItem !== 'function'
) {
  // @ts-ignore
  delete global.localStorage;
}

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "cdn.discordapp.com", "media.discordapp.net"],
  },
};

export default nextConfig;
