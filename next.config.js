/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "81.200.148.149",
        port: "13069",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
