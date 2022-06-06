import { writeFile, open, close } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ERR_CODE_EXIST = 'EEXIST';
const ERR_MESSAGE = 'FS operation failed';
const SUCCESS_MESSAGE = 'The file has been saved!';
const FILE_NAME = path.join(__dirname, 'files', 'fresh.txt');
const FILE_CONTENT = 'I am fresh and young';

export const create = async () => {

  open(FILE_NAME, 'wx', (err, fd) => {
    try {
      if (err?.code === ERR_CODE_EXIST) {
        throw new Error(ERR_MESSAGE);
      }

      writeFile(fd, FILE_CONTENT, 'utf8', (err) => {
        if (!err) return close(fd, (err) => {
          if (!err) console.log(SUCCESS_MESSAGE);
        });
      });
    } catch (e) {
      console.error(e);
    }
  });
};


await create();
