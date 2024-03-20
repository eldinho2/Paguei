/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  register: true, // register pwa
  skipWaiting: true, // skip waiting for old service worker to be disabled
  runtimeCaching: [
    // Cache all routes
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "https-calls",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        networkTimeoutSeconds: 20,
      },
    },
    // Cache assets & data from external api
    {
      urlPattern: /dashboard.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 20,
      },
    },
  ],
});

const nextConfig = {
  transpilePackages: ['@mui/x-charts']
}

module.exports = withPWA(nextConfig)
