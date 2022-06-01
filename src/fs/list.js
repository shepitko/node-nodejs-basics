import fs from 'fs';

const ERR_MESSAGE = 'FS operation failed';
const FOLDER = 'src/fs/files';

export const list = async () => {
  fs.readdir(FOLDER, (err, files) => {
    try {
      if (err) throw new Error(ERR_MESSAGE);

      console.log(files);
    } catch (e) {
      console.error(e);
    }
  });
};

await list();
