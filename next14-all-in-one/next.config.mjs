/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        hostname: "www.metabank360.com",
      },
    ],
  },
};

export default nextConfig;
