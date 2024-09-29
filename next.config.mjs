/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["mdx", "tsx", "ts"],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain
  },
};

export default nextConfig;
