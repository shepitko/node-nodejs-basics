import { readFileSync } from 'fs'
const { createHash } = await import('crypto');

const FILE_PATH = 'src/hash/files/fileToCalculateHashFor.txt';

export const calculateHash = async () => {
  const fileBuffer = readFileSync(FILE_PATH);
  const hash = createHash('sha256');

  hash.update(fileBuffer);

  console.info(hash.digest('hex'));
};

await calculateHash();