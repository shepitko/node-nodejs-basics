import fs from 'fs'

const ERR_MESSAGE = 'FS operation failed';
const FILE_NAME = 'src/fs/files/wrongFilename.txt';
const NEW_FILE_NAME = 'src/fs/files/properFilename.md';

export const rename = async () => {
  try {
    fs.rename(FILE_NAME, NEW_FILE_NAME, (err) => {
      if (err) throw new Error(ERR_MESSAGE);
    })
  } catch (e) {
    console.error(e);
  }
};

await rename();