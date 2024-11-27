import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'avatars.fastly.steamstatic.com' },
        ],
    },
};

export default nextConfig;
