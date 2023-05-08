
const fs = require('fs');
const path = require('path');

async function checkFolderExsist() {
  let exsist;
  await fs.promises.access(path.resolve(__dirname, 'files-copy'))
    .then(() => {
      exsist = true;
    })
    .catch(() => {
      exsist = false;
    });
  return exsist;
}

async function createFolder() {
  if (await checkFolderExsist()) {
    await fs.promises.rm(path.resolve(__dirname, 'files-copy'), { recursive: true }, error => {
      if (error) throw error;
    });
  }
  await fs.promises.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, error => {
    if (error) throw error;
  });
}

async function copyFiles() {
  let files = '';
  files = await fs.promises.readdir(path.resolve(__dirname, 'files'));
  files.forEach(file => {
    fs.promises.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file));
  });
}

createFolder()
  .then(() => copyFiles());