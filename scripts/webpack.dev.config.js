const path = require("path");

const {apps, BLD_DIR, DST_DIR} = require("../src/suite");

let entries = {};
for (let i = 0; i < apps.length; i++) {
    entries[apps[i]] = path.join(BLD_DIR, apps[i]);
}

// App bundles
module.exports = {
    entry: entries,
    mode: "development",
    output: {
        path: path.join(DST_DIR, "js"),
        filename: "[name].bundle.js",
    },
    target: "web",
};
