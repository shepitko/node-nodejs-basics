import { readFile } from 'fs';

const ERR_MESSAGE = 'FS operation failed';
const FILE_PATH = 'src/fs/files/fileToRead.txt';

export const read = async () => {
  readFile(FILE_PATH, (err, data) => {
    try {
      if (err) throw new Error(ERR_MESSAGE);

      console.log(data.toString('utf-8'));
    } catch (e) {
      console.error(e);
    }
  });
}


await read();