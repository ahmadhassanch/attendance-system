import * as path from 'path';

const rootDir = `app-web`;
const imageDir = 'screenshots';
const sourceDir = path.join(rootDir, imageDir);
const outputFile = path.join(rootDir, rootDir + '.md'); // Replace with your desired output file

const fs = require('fs');

let st = '';
fs.readdirSync(sourceDir).forEach((file: any) => {
  console.log(file);
  //   st += `${file}\n`;
  st += `\n\n`;
  st += `## ${file}\n`;
  st += `<img src="${imageDir}/${file}" alt="image" height="500">\n`; //height="500"

  //   const fileNames = files.join('\n');
});

fs.writeFile(outputFile, st, (err: any) => {
  if (err) {
    console.error(`Error writing to file: ${err}`);
    return;
  }

  console.log(`File names successfully written to ${outputFile}`);
});
