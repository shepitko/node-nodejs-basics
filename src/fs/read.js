import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ERR_MESSAGE = 'FS operation failed';
const FILE_PATH = path.join(__dirname, 'files', 'fileToRead.txt');

export const read = async () => {
  try {
    const content = await readFile(FILE_PATH);

    console.log(content.toString('utf-8'));
  } catch (e) {
    if (e) throw new Error(ERR_MESSAGE);
  }
}


await read();