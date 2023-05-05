
const fs = require('fs');
const path = require('path');


// fs.access(path.resolve(__dirname, 'files-copy'), (error => {
//   if (error) {
//     fs.promises.mkdir(path.resolve(__dirname, 'files-copy'));
//   }
// }));
fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true }, error => {
  if (error) throw error;
});


fs.readdir(path.resolve(__dirname, 'files-copy'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      fs.unlink(path.resolve(__dirname, 'files-copy', file), error => {
        // console.log('WWWWW______');
        if (error) throw error
      })
    })
  }
})

fs.readdir(path.resolve(__dirname, 'files'), (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach(file => {
      // console.log(file);
      // console.log(path.resolve(__dirname, 'files', file))
      // console.log(path.resolve(__dirname, 'files-copy', file));
      fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), error => {
        if (error) {
          console.log(error);
        }
      })
    })
  }
})


// console.log(path.resolve(__dirname, 'files', 'test-js.js'));

// fs.copyFile(path.resolve(__dirname, 'files', 'test-js.js'), '123.js', err => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Success!');
// })