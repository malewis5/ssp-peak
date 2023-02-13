/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/table/people?page=0',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
