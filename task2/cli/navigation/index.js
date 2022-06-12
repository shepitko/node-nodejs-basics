import { readdir } from 'fs/promises';
import path from 'path';
import { cwd, chdir } from 'process'
import { CD, LS, UP } from '../../enums/commands.js';
import { EXECUTION_ERROR, WRONG_COMMAND } from '../../enums/messages.js';
import { whereAmI } from './whereAmI.js';

export const handleNavigationActions = async ({ cmd, args, output }) => {
	try {
		if (!args && cmd === CD) {
			throw new Error(WRONG_COMMAND);
		}

		if (cmd === UP) {
			chdir('../');
			whereAmI({ path: cwd(), output });
		}

		if (cmd === CD) {
			let folder = args;

			try {
				chdir(folder);
				whereAmI({ path: cwd(), output });
			} catch {
				throw new Error(EXECUTION_ERROR);
			}
		}

		if (cmd === LS) {
			const files = await readdir(cwd());

			output.write(`${files.join('\r\n')}\n`);
		}
	} catch (e) {
		console.log(`\n${e.toString()}`);
	}
}
