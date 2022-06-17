const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
