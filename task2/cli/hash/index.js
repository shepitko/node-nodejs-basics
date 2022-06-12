import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process'

export const handleHashActions = ({ args, output }) => {
	const file = path.join(cwd(), args[0]);

	const fileBuffer = readFileSync(file);
	const hash = createHash('sha256');

	hash.update(fileBuffer);

	output.write(hash.digest('hex'));
}
