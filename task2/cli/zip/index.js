import zlib from 'zlib';
import fs from 'fs';

import { COMPRESS, DECOMPRESS } from '../../enums/commands.js';
import { COMPRESS_MESSAGE, DECOMPRESS_MESSAGE, EXECUTION_ERROR } from '../../enums/messages.js';

export const handleZipActions = ({ cmd, args, output: cliOutput }) => {
	const [from, to] = args;

	if (cmd === COMPRESS) {
		try {
			const input = fs.createReadStream(from, 'utf-8');
			const output = fs.createWriteStream(to);
			const brotli = zlib.createBrotliCompress();

			const stream = input.pipe(brotli).pipe(output);

			input.on('error', () => cliOutput.write(EXECUTION_ERROR));

			stream.on('finish', () => cliOutput.write(COMPRESS_MESSAGE));
		} catch (e) {
			cliOutput.write(EXECUTION_ERROR);
		}
	}

	if (cmd === DECOMPRESS) {
		try {
			const input = fs.createReadStream(from);
			const output = fs.createWriteStream(to, 'utf-8');
			const gzip = zlib.createBrotliDecompress();

			const stream = input.pipe(gzip).pipe(output);

			input.on('error', () => cliOutput.write(EXECUTION_ERROR));
			stream.on('finish', () => cliOutput.write(DECOMPRESS_MESSAGE));
		} catch (e) {
			cliOutput.write(EXECUTION_ERROR);
		}
	}
}

// Test case:
//
// -- success-case --
//
// cd files
// compress fileToCompress.txt zip.gz
// decompress zip.gz newFileFromCompress.txt
//
// -- fail-case --
//
// compress fdfdf gg.gz