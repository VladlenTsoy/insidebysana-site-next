const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")

const nextConfig = {
    // async redirects() {
    //     return [
    //         {
    //             source: "/((?!maintenance|_next).*)",
    //             destination: "/maintenance",
    //             permanent: true
    //         }
    //     ]
    // },
    images: {
        disableStaticImages: true,
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ["api.insidebysana.uz", "api.testinsidebysana.uz", "files.insidebysana.uz", "localhost", "insidebysana.sfo3.digitaloceanspaces.com"]
    },
    reactStrictMode: true,
}

module.exports = withPlugins([[withImages], nextConfig])
