/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "framer-motion"]
  }
};

export default nextConfig;
