/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["mdx", "tsx", "ts"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
