/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3001/:path*', // Proxy to Express server
  //     },
  //   ];
  // },
};
export default nextConfig;
