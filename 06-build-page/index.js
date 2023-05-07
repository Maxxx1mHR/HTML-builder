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


//Создание всех папок из assets в project-dist
function createFolder(point) {
  // fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', point), { recursive: true }, error => {
  fs.mkdir(path.resolve(__dirname, 'project-dist', point), { recursive: true }, error => {
    // console.log('TEST', path.resolve(__dirname, 'project-dist', 'assets', point));
    if (error) throw error;
  });
}

function copyAssets(folder) {
  fs.readdir(path.resolve(__dirname, folder), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      if (file.isDirectory()) {
        // console.log('Folder', file.name);
        // createFolder(path.resolve(__dirname, 'project-dist', 'assets', file.name));
        // fs.mkdir(path.resolve(__dirname, 'project-dist', folder, file.name), { recursive: true }, error => {
        //   if (error) throw error;
        // });
        createFolder(folder + '/' + file.name);
        copyAssets(folder + '/' + file.name);
        // console.log('FOLDER', folder);
        // console.log('DIR', path.resolve(__dirname, 'project-dist', folder, file.name));

      } else {
        console.log('FILE', path.resolve(__dirname, folder, file.name));

        // items.forEach(item => {
        // console.log('item name', item);
        let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name));
        let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', folder + '/' + file.name));
        // console.log('NAME', item.name);
        // console.log('ПУТЬ', path.resolve(__dirname, 'project-dist', 'assets', file.name));
        readableStream.on('data', chunk => {
          console.log(chunk);
          writeableStream.write(chunk);
        })
        // })

      }
    })
  })
}

copyAssets('assets');

// fs.readdir(path.resolve(__dirname, folder, file.name), { withFileTypes: true }, (error, items) => {
//   if (error) {
//     console.log(error);
//   } else {
//     items.forEach(item => {
//       let readableStream = fs.createReadStream(path.resolve(__dirname, folder, file.name, item.name));
//       // let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'assets', file.name, item.name));
//       // console.log('NAME', item.name);
//       // console.log('ПУТЬ', path.resolve(__dirname, 'project-dist', 'assets', file.name));
//       readableStream.on('data', chunk => {
//         console.log(chunk);
//         // writeableStream.write(chunk);
//       })
//     })
//   }
// })


// fs.readdir(path.resolve(__dirname, 'assets'), { withFileTypes: true }, (error, dirs) => {
//   if (error) {
//     console.log(error);
//   } else {
//     dirs.forEach(dir => {
//       // console.log(dir.name);
//       if (dir.isDirectory) {
//         fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', dir.name), { recursive: true }, error => {
//           if (error) throw error;
//         });
//         fs.readdir(path.resolve(__dirname, 'assets', dir.name), { withFileTypes: true }, (error, files) => {
//           if (error) {
//             console.log(error);
//           } else {
//             files.forEach(file => {
//               // console.log(file);
//               let readableStream = fs.createReadStream(path.resolve(__dirname, 'assets', dir.name, file.name));
//               let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'assets', dir.name, file.name));
//               readableStream.on('data', chunk => {
//                 // console.log(chunk);
//                 writeableStream.write(chunk);
//               })
//             })
//           }
//         })
//       } // Добавить else
//     })
//   }
// })




// fs.readdir(path.resolve(__dirname, 'project-dist'), (error, files) => {
//   if (error) {
//     console.log(error);
//   } else {
//     files.forEach(file => {
//       console.log(file);
//       fs.rmdir(path.resolve(__dirname, 'project-dist', file), err => {
//         if (err) throw err; // не удалось удалить папку
//         console.log('Папка успешно удалена');
//       });
//       fs.unlink(path.resolve(__dirname, 'project-dist', file), error => {
//         if (error) throw error
//       })
//     })
//   }
// })
