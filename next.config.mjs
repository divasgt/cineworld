/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {hostname: "image.tmdb.org"},
      {hostname: "placehold.co"}
    ]
  }
};

export default nextConfig;
