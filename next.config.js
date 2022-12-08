/** @type {import('next').NextConfig} */

const localPath = "";
//TODO
const basePath =
    process.env.NODE_ENV === "development" ? localPath : "/localhost:3000";
const nextConfig = {
    experimental: {
        appDir: true,
    },
    basePath: basePath,
};

module.exports = nextConfig;
