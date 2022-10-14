const esbuild = require("esbuild");
const path = require("path");
const glob = require("glob");

const {apps, ROOT_DIR, SRC_DIR, BLD_DIR} = require("../src/suite");
apps.push("Suite");

const isProd = process.argv.some(
    (argv) => argv === "-prod" || argv === "--prod"
);

const nodeDefaults = {
    platform: "node",
    target: "es2020",
    sourcemap: isProd ? false : "inline",
    keepNames: true,
    logLevel: "info",
    minify: true,
    define: {
        "process.env.NODE_ENV": isProd ? '"production"' : '"development"',
    },
};

const bundleDefaults = {
    ...nodeDefaults,
    bundle: true,
};

for (let i = 0; i < apps.length; i++) {
    esbuild.build({
        // TypeScript -> JavaScript
        ...nodeDefaults,
        format: "cjs",
        mainFields: ["browser", "main"],
        entryPoints: glob
            .sync(`src/${apps[i]}/**/*.{ts,tsx,json}`, {
                nodir: true,
                root: ROOT_DIR,
            })
            .filter((file) => !file.endsWith(".d.ts")),
        outdir: path.join(BLD_DIR, apps[i]),
    });
}
