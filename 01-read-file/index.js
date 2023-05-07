// 1 способ, через console.log
const fs = require('fs')
const path = require('path');
const { stdout } = process;

let readableStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf8');
readableStream.on('data', chuck => {
  stdout.write(chuck);
})


