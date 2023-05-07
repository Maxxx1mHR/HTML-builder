const fs = require('fs');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
  if (error) throw error;
});

fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true }, error => {
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

function createFolder(point) {
  fs.mkdir(path.resolve(__dirname, 'project-dist', point), { recursive: true }, error => {
    if (error) throw error;
  });
}

function copyAssets(folder) {
  fs.readdir(path.resolve(__dirname, folder), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      if (file.isDirectory()) {
        createFolder(folder + '/' + file.name);
        copyAssets(folder + '/' + file.name);
      } else {
        let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name));
        let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', folder + '/' + file.name));
        readableStream.on('data', chunk => {
          writeableStream.write(chunk);
        })
      }
    })
  })
}

copyAssets('assets');