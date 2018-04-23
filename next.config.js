require("dotenv").config()

const path = require("path")
const Dotenv = require("dotenv-webpack")

const currentExport = {
  webpack: config => {
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

const withTypescript = require("@zeit/next-typescript")
module.exports = withTypescript(currentExport)
