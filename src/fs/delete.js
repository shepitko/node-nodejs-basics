import { rm } from 'fs/promises'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_NAME = path.join(__dirname, 'files', 'fileToRemove.txt');
const ERR_MESSAGE = 'FS operation failed';

export const remove = async () => {
  try {
    await rm(FILE_NAME);
  } catch (e) {
    if (e) throw new Error(ERR_MESSAGE);
  }
};

await remove();