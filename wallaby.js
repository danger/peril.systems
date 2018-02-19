module.exports = wallaby => {
  return {
    files: ["tsconfig.json", "pages/**/*.+(ts|tsx)", "pages/**/*.json", "!pages/**/*.test.+(ts|tsx)"],
    tests: ["pages/**/*.test.+(ts|tsx)"],

    env: {
      type: "node",
      runner: "node",
    },

    testFramework: "jest",
  }
}
