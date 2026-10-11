/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-e2a325b62aab4461a6955340c5947bd4.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;