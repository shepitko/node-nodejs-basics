import { rm } from 'fs'

const FILE_NAME = 'src/fs/files/fileToRemove.txt';
const ERR_MESSAGE = 'FS operation failed';

export const remove = async () => {
  try {
    rm(FILE_NAME, (err) => {
      if (err) throw new Error(ERR_MESSAGE);
    });
  } catch (e) {
    console.error(e);
  }
};

await remove();