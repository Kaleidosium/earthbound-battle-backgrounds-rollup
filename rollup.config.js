const arraybuffer = require("@wemap/rollup-plugin-arraybuffer");
const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const pkg = require("./package.json");
const resolve = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");

module.exports = [
  {
    // browser-friendly UMD build
    input: "src/index.js",
    output: {
      name: "EBB",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      arraybuffer({ include: "**/*.dat" }), // so Rollup can import .dat files
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(), // minifying
      // babel configuration
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
        skipPreflightCheck: true,
      }),
    ],
  },
  {
    // CommonJS (for Node) and ES module (for bundlers) build.
	  // (We could have three entries in the configuration array
	  // instead of two, but it's quicker to generate multiple
	  // builds from a single configuration where possible, using
	  // an array for the `output` option, where we can specify
	  // `file` and `format` for each target)
    input: ["src/index.js"],
    external: ['ms'],
    plugins: [arraybuffer({ include: "**/*.dat" })],
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
    ],
  },
];
