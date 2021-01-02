const program = require('commander')
const fs = require('fs')
const md2html = require('./md2html')

program.option('--gfm', 'GFM を有効にする')
program.parse(process.argv)
const filePath = program.args[0]

const clientOptions = {
  gfm: false,
  ...program.opts(),
}

fs.readFile(filePath, { encoding: 'utf-8' }, (error, file) => {
  if (error) {
    console.error(error)
    process.exit(1)
    return
  }

  const html = md2html(file, clientOptions)
  console.log(html)
})