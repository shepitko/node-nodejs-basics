import fs from 'fs/promises'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ERR_MESSAGE = 'FS operation failed';
const FILE_NAME = path.join(__dirname, 'files', 'wrongFilename.txt');
const NEW_FILE_NAME = path.join(__dirname, 'files', 'properFilename.md');

export const rename = async () => {
  try {
    await fs.rename(FILE_NAME, NEW_FILE_NAME);
  } catch (e) {
    if (e) throw new Error(ERR_MESSAGE);
  }
};

await rename();