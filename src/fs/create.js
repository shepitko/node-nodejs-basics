import { writeFile, open, close } from 'fs';

export const create = async () => {
  const ERR_CODE_EXIST = 'EEXIST';
  const ERR_MESSAGE = 'FS operation failed';
  const SUCCESS_MESSAGE = 'The file has been saved!';
  const FILE_NAME = 'src/fs/files/fresh.txt';
  const FILE_CONTENT = 'I am fresh and young';

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
