/** @type {import('next').NextConfig} */

const localPath = "";
//TODO
const basePath =
    process.env.NODE_ENV === "development" ? localPath : "/localhost:3000";
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["storage.googleapis.com", "coinpayments.net"],
        minimumCacheTTL: 1500000,
    },
    basePath: basePath,
};

module.exports = nextConfig;
