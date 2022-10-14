const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const {apps, BLD_DIR, DST_DIR} = require("../src/suite");

let entries = {};
for (let i = 0; i < apps.length; i++) {
    entries[apps[i]] = path.join(BLD_DIR, apps[i]);
}

// App bundles
module.exports = {
    entry: entries,
    mode: "production",
    optimization: {
        minimizer: [new TerserPlugin({})],
    },
    output: {
        path: path.join(DST_DIR),
        filename: path.join("[name]", "[name].bundle.js"),
    },
    target: "web",
};
