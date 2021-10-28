import arraybuffer from '@wemap/rollup-plugin-arraybuffer';
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from './package.json';
import resolve from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: {
      name: "index",
      file: `dist/${pkg.name}.js`,
      format: "umd",
    },
    external: ['ms'],
    plugins: [
      arraybuffer({ include: '**/*.dat' }), // so Rollup can import .dat files
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      // terser(), // minifying
      // babel configuration
      babel({ exclude: 'node_modules/**', babelHelpers: "runtime", skipPreflightCheck: true }),
    ]
}
