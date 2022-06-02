import { open } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = path.join(__dirname, 'files', 'fileToRead.txt')



export const read = async () => {
    const fd = await open(FILE_PATH);
    const readableStream = fd.createReadStream();

    readableStream.on('data', chunk => process.stdout.write(chunk));
};

await read();