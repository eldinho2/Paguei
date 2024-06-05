/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default;

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  }
});