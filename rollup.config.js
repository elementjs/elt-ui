import resolve from '@rollup/plugin-node-resolve'
import * as path from 'path'
import * as fs from 'fs'

const re = /^\/\/# source.*$/m

export default {
  external: ['elt'],
  input: 'lib/index.js',
  output: {
    file: 'dist/eltui.js',
    sourcemap: true,
    name: 'eltui',
    format: 'umd',
    globals: {elt: 'elt'}
  },
  plugins: [
    resolve(),
  ]
}
