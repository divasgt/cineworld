/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns : [
      {hostname: "image.tmdb.org"},
      {hostname: "placehold.co"}
    ],
    // this tells Next.js to serve images as they are, without running any built-in optimization logic
    unoptimized: true,
  }
};

export default nextConfig;
