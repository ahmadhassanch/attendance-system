import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import * as path from "path";
// ✅ write to file SYNCHRONOUSLY
export function writeToFile(fileName: string, data: any) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */

  // console.log(fileName);
  const directory = path.dirname(fileName);
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  writeFileSync(fileName, data, {
    flag: "w",
  });

  // const contents = readFileSync(fileName, "utf-8");
  // console.log(fileName);

  // return contents;
}

export function writeJsonToFile(fileName: string, data: any) {
  const str = JSON.stringify(data, null, 2);
  writeToFile(fileName, str);
}

// writeToFile('./test/test/example.txt', 'One\nTwo\nThree\nFour');
// export writeToFile;
