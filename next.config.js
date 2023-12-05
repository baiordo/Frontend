/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "83.222.8.129",
        port: "13069",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
