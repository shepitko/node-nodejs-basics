import { readdir } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ERR_MESSAGE = 'FS operation failed';
const FOLDER = path.join(__dirname, 'files');

export const list = async () => {
  try {
    const files = await readdir(FOLDER);

    console.log(files);
  } catch (e) {
    if (e) throw new Error(ERR_MESSAGE);
  }
};

await list();
