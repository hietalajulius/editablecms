/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    contentfulManagementKey: process.env.CONTENTFUL_MANAGEMENT_KEY,
    contentfulSpace: process.env.CONTENTFUL_SPACE,
  },
};

module.exports = nextConfig;
