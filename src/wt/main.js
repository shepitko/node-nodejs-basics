import { Worker } from 'worker_threads';
import { cpus } from "os";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_NAME = path.join(__dirname, 'worker.js');

const NUMBER = 10;
const RESOLVED = 'resolved';
const ERROR = 'error';


const compute = (fibNum) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(FILE_NAME, { workerData: { fibNum } });

        worker.on('message', (msg) => {
            // Next line for debug
            // console.log(`worker ${worker.threadId} was started`);
            return resolve({ status: RESOLVED, data: msg })
        });

        worker.on('error', () => {
            return reject({ status: ERROR, data: null })
        });

        worker.on('exit', () => {
            // Next line for debug
            // console.log('DONE');
        });
    })
}

export const performCalculations = async () => {
    const coreCount = cpus().length;
    try {
        const workers = [];

        for (let i = NUMBER; i < coreCount + NUMBER; i++) {
            workers.push(compute(i))
        }
        const result = await Promise.all(workers);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

await performCalculations();