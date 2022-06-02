import zlib from 'zlib';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE = path.join(__dirname, 'files', 'fileToCompress.txt');
const ARCHIVE = path.join(__dirname, 'files', 'archive.gz');

export const decompress = async () => {
    const input = fs.createReadStream(ARCHIVE);
    const output = fs.createWriteStream(FILE, 'utf-8');
    const gzip = zlib.createGunzip();

    input.pipe(gzip).pipe(output);
};

await decompress()