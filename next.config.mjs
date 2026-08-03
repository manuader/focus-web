/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root to this project (a stray lockfile in $HOME otherwise
  // makes Next infer the wrong workspace root).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Brand imagery ships as local static JPGs; allow modern formats.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
