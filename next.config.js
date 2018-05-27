require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const withTypescript = require("@zeit/next-typescript")

module.exports = withTypescript({
  webpack(config, options) {
    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ]

    const HMR = config.module.rules.find(r => r.loader === "hot-self-accept-loader")
    if (HMR) {
      HMR.test = /never$/
      console.log("Removing HMR")
    }

    return config
  },
})
