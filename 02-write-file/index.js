const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

stdout.write('Дружище, как я рад тебя видеть! Напиши что-нибудь...\n');

process.on('SIGINT', () => {
  stdout.write('Ну ты это, заходи если что!\n');
  process.exit();
});

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Ну ты это, заходи если что!\n');
    process.exit();
  } else {
    writeableStream.write(data);
  }
});