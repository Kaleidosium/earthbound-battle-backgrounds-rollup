import arraybuffer from "@wemap/rollup-plugin-arraybuffer";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    // browser-friendly UMD build
    input: "src/index.js",
    output: {
      name: "EBB",
      file: `dist/${pkg.browser}.js`,
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
        file: `dist/${pkg.module}.js`,
        format: "es",
        exports: "named",
        sourcemap: true,
      },
      {
        file: `dist/${pkg.main}.js`,
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
    ],
  },
];
