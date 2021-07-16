const { promisify } = require('util')
const fs = require('fs')
const convert = require('heic-convert')

const args = process.argv.slice(2)
if (args.length !== 2) {
  console.log('Error! Requires only 2 params: input_heic_file_path and output_png_file_path')
} else {
  (async () => {
    const inputBuffer = await promisify(fs.readFile)(args[0])
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'PNG',       // output format
    })
    await promisify(fs.writeFile)(args[1], outputBuffer)
  })()
}
