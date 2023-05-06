const fs = require('fs');
const path = require('path');

fs.readdir(path.resolve(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        let fileName = file.name.split('.')[0];
        let extension = file.name.split('.')[1];
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${fileName} - ${extension} - ${stats.size}b`)
          }
        })
      }
    })
  }

})

