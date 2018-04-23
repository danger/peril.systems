require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const currentExport = {
  pageExtensions: ["jsx", "js", "ts", "tsx"],
  webpack: (config, options) => {
    const { dir, defaultLoaders, dev, isServer } = options
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx", ".json"]

    // HMR for TS pages
    if (dev && !isServer) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: "hot-self-accept-loader",
        include: [path.join(dir, "pages")],
        options: {
          extensions: /\.(ts|tsx)$/,
        },
      })
    }

    // Use babel for TSC files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [dir],
      exclude: /node_modules/,
      use: [defaultLoaders.babel],
    })

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
