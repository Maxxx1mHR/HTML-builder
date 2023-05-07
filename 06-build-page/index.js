const fs = require('fs');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
  if (error) throw error;
});

let template = '';

let readableStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
readableStream.on('data', chunk => {
  template = chunk;
  fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      let readableStream = fs.createReadStream(path.resolve(__dirname, 'components', file.name), 'utf-8');
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
      readableStream.on('data', chunk => {
        template = template.split(`{{${file.name.split('.')[0]}}}`).join(chunk);
        writeableStream.write(template);
      })
    })
  })
})

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
  if (error) throw error;
  let arrStyle = [];
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
      readableStream.on('data', chuck => {
        arrStyle.push(chuck);
        writeableStream.write(arrStyle.join('\n'));
      })
    }
  })
})