import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process'

import { EXECUTION_ERROR } from '../../enums/messages.js';

export const handleHashActions = ({ args, output }) => {
	try {
		const file = path.join(cwd(), args[0]);

		const fileBuffer = readFileSync(file);
		const hash = createHash('sha256');

		hash.update(fileBuffer);

		output.write(hash.digest('hex'));
	} catch (e) {
		output.write(EXECUTION_ERROR);
	}
}

// Test case:
//
// cd files
// hash showHashThisFile.txt
