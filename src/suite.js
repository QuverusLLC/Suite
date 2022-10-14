/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
const path = require("path");

module.exports = {
    apps: ["Cadence", "Score"],
    ROOT_DIR: path.join(__dirname, ".."),
    SRC_DIR: path.join(__dirname),
    BLD_DIR: path.join(__dirname, "..", "build"),
    DST_DIR: path.join(__dirname, "..", "dist"),
};
