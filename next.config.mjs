/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'cdn.moralis.io',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
