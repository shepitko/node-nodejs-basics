import { createWriteStream } from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import process, { stdin, stdout } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_PATH = path.join(__dirname, 'files', 'fileToWrite.txt')

export const write = async () => {

    const stream = createWriteStream(FILE_PATH);
    const input = stdin
    const output = stdout;

    output.write('Type the text into the console and hit enter.\nThis text will be written to file fileToWrite.txt\n');

    input.on('data', data => {
        stream.write(data);

        output.write("DONE");
        process.exit();
    });
};



await write();