import * as fs from 'fs';
import * as path from 'path';

export function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

export function deleteFile(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully deleted ${filePath}`);
    }
  });
}
// const folderPath = 'path/to/folder';
// deleteFolderRecursive(folderPath);
