import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const { createHash } = await import('crypto');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

export const calculateHash = async () => {
  const fileBuffer = readFileSync(FILE_PATH);
  const hash = createHash('sha256');

  hash.update(fileBuffer);

  console.info(hash.digest('hex'));
};

await calculateHash();