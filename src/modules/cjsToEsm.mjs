import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const a = JSON.parse(fs.readFileSync(path.join(__dirname, 'files', 'a.json')));
const b = JSON.parse(fs.readFileSync(path.join(__dirname, 'files', 'b.json')));

const random = Math.random();

export const unknownObject = random > 0.5 ? a : b;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

export const createMyServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});



