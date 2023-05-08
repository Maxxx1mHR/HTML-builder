const fs = require('fs');
const path = require('path');

async function checkFolderExsist() {
  let exsist;
  await fs.promises.access(path.resolve(__dirname, 'project-dist'))
    .then(() => {
      exsist = true;
    })
    .catch(() => {
      exsist = false;
    });
  return exsist;
}

async function createBasicFolder() {
  if (await checkFolderExsist()) {
    await fs.promises.rm(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
      if (error) throw error;
    });
  }
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true }, error => {
    if (error) throw error;
  });
}

async function createTemplate() {
  let template = '';
  template = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf-8');

  let componentFiles = '';
  componentFiles = await fs.promises.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true });

  componentFiles.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.html') {
      let readableStream = fs.createReadStream(path.resolve(__dirname, 'components', file.name), 'utf-8');
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
      readableStream.on('data', chunk => {
        template = template.split(`{{${file.name.split('.')[0]}}}`).join(chunk);
        writeableStream.write(template);
      });
    }
  });

}

async function createStyle() {
  let arrStyle = [];
  let styleFiles = '';
  styleFiles = await fs.promises.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true });

  styleFiles.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
      readableStream.on('data', chunk => {
        arrStyle.push(chunk);
        writeableStream.write(arrStyle.join('\n'));
      });
    }
  });
}

async function createFolder(point) {
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', point), { recursive: true }, error => {
    if (error) throw error;
  });
}

async function copyAssets(folder) {

  let allFiles = '';
  allFiles = await fs.promises.readdir(path.resolve(__dirname, folder), { withFileTypes: true });
  allFiles.forEach(file => {
    if (file.isDirectory()) {
      createFolder(folder + '/' + file.name);
      copyAssets(folder + '/' + file.name);
    } else {
      let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name));
      let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', folder + '/' + file.name));
      readableStream.on('data', chunk => {
        writeableStream.write(chunk);
      });
    }
  });
}

createBasicFolder()
  .then(() => createTemplate())
  .then(() => createStyle())
  .then(() => copyAssets('assets'));
