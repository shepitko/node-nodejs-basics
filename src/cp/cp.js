import { spawn } from 'child_process'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FILE_SCRIPT = path.join(__dirname, 'files', 'script.js');

export const spawnChildProcess = async (...args) => {
    const cp = spawn('node', [FILE_SCRIPT, ...args,], {
        stdio: ["pipe", "pipe", "pipe", "ipc"]
    });

    process.stdin.pipe(cp.stdin);
    cp.stdout.pipe(process.stdout);

    // checking
    cp.stdin.write('sent message from parent\n');

    // Close child process
    setTimeout(() => cp.stdin.write('CLOSE\n'), 2000);
}

spawnChildProcess('args1', 'abg');