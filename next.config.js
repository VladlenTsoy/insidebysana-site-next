const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")

const nextConfig = {
    images: {
        disableStaticImages: true,
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ["api.insidebysana.uz", "api.testinsidebysana.uz", "localhost"]
    },
    reactStrictMode: true,
}

module.exports = withPlugins([[withImages], nextConfig])
