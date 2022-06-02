import { Transform } from 'stream';
import process, { stdin, stdout } from 'process';

export const transform = async () => {

    const input = stdin
    const output = stdout;

    const reverse = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join(''));
        },
    });
    input.pipe(reverse).pipe(output)

    // When reverse return data, we will exit a process
    // for infinity working you can comment this part below
    reverse.on('data', () => {
        process.exit()
    })
};

await transform();