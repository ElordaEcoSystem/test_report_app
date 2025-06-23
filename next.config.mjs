/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  env: {
    PUBLIC_UPLOAD_URL: process.env.PUBLIC_UPLOAD_URL,
  },
};

export default nextConfig;
