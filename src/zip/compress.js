import zlib from 'zlib';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE = path.join(__dirname, 'files', 'fileToCompress.txt');
const ARCHIVE = path.join(__dirname, 'files', 'archive.gz');

export const compress = async () => {

    const input = fs.createReadStream(FILE, 'utf-8');
    const output = fs.createWriteStream(ARCHIVE);
    const gzip = zlib.createGzip();

    input.pipe(gzip).pipe(output);
};

await compress();