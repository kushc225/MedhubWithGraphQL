/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

const nextConfig = {};

module.exports = withVideos({
  reactStrictMode: false,
});
