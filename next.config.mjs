/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**', // allow all images from example.com
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion']
  }
};

export default nextConfig;


