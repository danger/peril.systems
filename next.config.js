require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const currentExport = {
  pageExtensions: ["jsx", "js", "ts", "tsx"],
  webpack: (config, options) => {
    const { dir, defaultLoaders, dev, isServer } = options
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"]

    // Use babel for TSC files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: [defaultLoaders.babel],
    })

    if (dev && !isServer) {
      const HMR = config.module.rules.find(r => r.loader === "hot-self-accept-loader")
      if (HMR) {
        HMR.test = /\.(ts|tsx)$/
        HMR.options.extensions = /\.(ts|tsx)$/
      }
    }

    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ]

    return config
  },
}

module.exports = currentExport
