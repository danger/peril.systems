var getBabelRelayPlugin = require("babel-relay-plugin")
var schema = require("./schema.json")

module.exports = getBabelRelayPlugin(schema.data)
