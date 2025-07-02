import type { NextConfig } from "next";

const nextConfig = {
    output: 'standalone',
    experimental: {
        instrumentationHook: false
    }
};

module.exports = nextConfig;
