/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'important-keywords-united-loans.trycloudflare.com',
        port: '',
        pathname: '/images/**',
      },
    ]
  }
};

export default config;
