const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;


stdout.write('Дружище, как я рад тебя видеть! Напиши что-нибудь...\n');

let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Ну ты это, заходи если что!\n');
    process.exit();
  } else {
    writeableStream.write(data);
  }
})
