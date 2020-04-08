import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import { eslint } from 'rollup-plugin-eslint';
import bundleSize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
import {dependencies} from './package.json';

const external = Object.keys(dependencies);
const extensions = ['.js', '.vue'];
const isProduction = !process.env.ROLLUP_WATCH;
const globals = { vue: 'Vue' };

const lintOpts = {
  extensions,
  exclude: ['**/*.json'],
  cache: true,
  throwOnError: true
};

const plugins = [
  resolve(),
  eslint(lintOpts),
  bundleSize(),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  buble()
];

export default {
  entry: 'src/entry.js',
  dest: 'dist/bundle.js',
  // plugins: [
  //   serve(),
  //   livereload('dist')
  // ],
  external,
  plugins,
  input: 'src/entry.js',
  output: {
    globals,
    file: 'dist/bundle.js',
    format: 'umd'
  }
};