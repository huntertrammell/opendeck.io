/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "avatars.dicebear.com",
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
      "kdlxzoehmofowjajguln.supabase.co",
    ],
  },
};

module.exports = nextConfig
