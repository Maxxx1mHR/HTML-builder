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
  // await fs.promises.rm(path.resolve(__dirname, folder));

  // await fs.promises.mkdir(path.resolve(__dirname, folder));

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

// createBasicFolder();



async function createTemplate() {
  let template = '';
  // let readableStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
  template = await fs.promises.readFile(path.resolve(__dirname, 'template.html'), 'utf-8');  //Шаблок template.index with {{article}} {{}} {{}}
  // console.log(template); //Шаблок template.index with {{article}} {{}} {{}}
  // return template;
  // readableStream.on('data', chunk => {
  // template = chunk;
  // });

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

  // let readableStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
  // readableStream.on('data', chunk => {
  //   template = chunk;
  //   fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (error, files) => {
  //     if (error) throw error;
  //     files.forEach(file => {
  //       let readableStream = fs.createReadStream(path.resolve(__dirname, 'components', file.name), 'utf-8');
  //       let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
  //       readableStream.on('data', chunk => {
  //         template = template.split(`{{${file.name.split('.')[0]}}}`).join(chunk);
  //         writeableStream.write(template);
  //       });
  //     });
  //   });
  // });
}

async function createStyle() {
  let arrStyle = [];
  let styleFiles = '';
  // styleFiles = await fs.promises.readdir(path.resolve(__dirname, 'styles')); //Файлы [ 'footer.css', 'header.css', 'main.css' ]
  styleFiles = await fs.promises.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true });
  // console.log(styleFiles);

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


// fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
//   if (error) throw error;
//   let arrStyle = [];
//   files.forEach(file => {
//     if (file.isFile() && path.extname(file.name) === '.css') {
//       let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
//       let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
//       readableStream.on('data', chunk => {
//         arrStyle.push(chunk);
//         writeableStream.write(arrStyle.join('\n'));
//       });
//     }
//   });
// });


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
  // fs.readdir(path.resolve(__dirname, folder), { withFileTypes: true }, (error, files) => {
  //   if (error) throw error;
  //   files.forEach(file => {
  //     if (file.isDirectory()) {
  //       createFolder(folder + '/' + file.name);
  //       copyAssets(folder + '/' + file.name);
  //     } else {
  //       let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name));
  //       let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', folder + '/' + file.name));
  //       readableStream.on('data', chunk => {
  //         writeableStream.write(chunk);
  //       });
  //     }
  //   });
  // });

}



createBasicFolder()
  .then(() => createTemplate())
  .then(() => createStyle())
  .then(() => copyAssets('assets'));






// const fs = require('fs');
// const path = require('path');

// fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, error => {
//   if (error) throw error;
// });

// fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true }, error => {
//   if (error) throw error;
// });

// let template = '';

// let readableStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
// readableStream.on('data', chunk => {
//   template = chunk;
//   fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true }, (error, files) => {
//     if (error) throw error;
//     files.forEach(file => {
//       let readableStream = fs.createReadStream(path.resolve(__dirname, 'components', file.name), 'utf-8');
//       let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
//       readableStream.on('data', chunk => {
//         template = template.split(`{{${file.name.split('.')[0]}}}`).join(chunk);
//         writeableStream.write(template);
//       });
//     });
//   });
// });

// fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
//   if (error) throw error;
//   let arrStyle = [];
//   files.forEach(file => {
//     if (file.isFile() && path.extname(file.name) === '.css') {
//       let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf-8');
//       let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));
//       readableStream.on('data', chunk => {
//         arrStyle.push(chunk);
//         writeableStream.write(arrStyle.join('\n'));
//       });
//     }
//   });
// });

// function createFolder(point) {
//   fs.mkdir(path.resolve(__dirname, 'project-dist', point), { recursive: true }, error => {
//     if (error) throw error;
//   });
// }

// function copyAssets(folder) {
//   fs.readdir(path.resolve(__dirname, folder), { withFileTypes: true }, (error, files) => {
//     if (error) throw error;
//     files.forEach(file => {
//       if (file.isDirectory()) {
//         createFolder(folder + '/' + file.name);
//         copyAssets(folder + '/' + file.name);
//       } else {
//         let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name));
//         let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', folder + '/' + file.name));
//         readableStream.on('data', chunk => {
//           writeableStream.write(chunk);
//         });
//       }
//     });
//   });
// }

// copyAssets('assets');