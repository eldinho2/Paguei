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
  runtimeCaching: [
    //cache assets & data from external api
    {
      urlPattern: /.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "others", // cache name
        expiration: {
          maxEntries: 32, // max cache entries
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 20, // fall back to cache if api does not response within 20 seconds
      },
    },
  ],
});

module.exports = withPWA({
    runtimeCaching: true,
    buildExcludes: [/middleware-manifest.json$/],
    reactStrictMode: true,
    swcMinify: true,
});