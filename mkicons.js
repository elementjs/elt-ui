#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const SVG_DIR = path.join(__dirname, '_svg')
const OUT_DIR = path.join(__dirname, 'src', 'icons')

const files = fs.readdirSync(SVG_DIR).filter(s => s.match(/\.svg$/))

for (var f of files) {
  const dest = path.basename(f).replace('.svg', '.tsx')
  const clsname = f.replace(/(?:^|-)([a-z])/g, (s, a) => a.toUpperCase())
    .replace(/\.svg$/, '')
  const source = fs.readFileSync(path.join(SVG_DIR, f), {encoding: 'utf-8'})
    .replace(`xmlns="http://www.w3.org/2000/svg" `, `class={Fa.icon} `)

  const src = `import { Attrs } from 'elt'
import { Fa } from './index'

export default function ${clsname}(a: Attrs) {
  return ${source}
}
`
  // console.log(src)
  fs.writeFileSync(path.join(OUT_DIR, dest), src, {encoding: 'utf-8'})

}