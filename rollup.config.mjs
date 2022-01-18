/* global process */

import html from '@rollup/plugin-html';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import template from './src/html-template.js';

import { createRequire } from 'module';
const req = createRequire(import.meta.url);
const babelconfig = req('./babel.config.json');

const PROD = process.env.NODE_ENV === 'production';

const plugins = [
  html({ template }),
  replace({
    preventAssignment: true,
    values: {
      '__ENV_PROD__': JSON.stringify(PROD),
      '__ENV_DEV__': JSON.stringify(!PROD),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  }),
  nodeResolve({ browser: true, preferBuiltins: false, extensions: [ '.mjs', '.js', '.json', '.jsx' ] }),
  commonjs({
    include: 'node_modules/**',
    sourceMap: false,
  }),
  babel(babelconfig),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    terser({ output: { comments: false } }),
  );
}

const config = {
  onwarn: (warning) => {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message ); // eslint-disable-line no-console
  },
  plugins,
  input: `./src/index.js`,
  preserveEntrySignatures: false,
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: !PROD,
      entryFileNames: "[name]_[hash].js",
      chunkFileNames: "[name]_[hash].js",
    },
  ],
  treeshake: true,
  watch: {
    exclude: 'node_modules/**',
  },
};

export default config;
