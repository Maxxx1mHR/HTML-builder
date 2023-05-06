const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  let arrStyle = [];
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
      readableStream.on('data', chuck => {
        arrStyle.push(chuck);
        writeableStream.write(arrStyle.join('\n'));
      })
    }
  })
})