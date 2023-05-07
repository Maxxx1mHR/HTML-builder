
const fs = require('fs');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, error => {
  if (error) throw error;
});


fs.readdir(path.resolve(__dirname, 'files-copy'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      fs.unlink(path.resolve(__dirname, 'files-copy', file), error => {
        if (error) throw error;
      });
    });
  }
});

fs.readdir(path.resolve(__dirname, 'files'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), error => {
        if (error) {
          console.log(error);
        }
      });
    });
  }
});