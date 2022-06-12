import { readFile, rename as rn, rm } from 'fs/promises';
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, open, writeFile, close, createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { cwd } from 'process';

import { ADD, CAT, CP, MV, RM, RN } from '../../enums/commands.js';
import { EXECUTION_ERROR, FILE_CREATED_MESSAGE } from '../../enums/messages.js';

const ERR_CODE_EXIST = 'EEXIST';

export const handleFileBaseActions = async ({ cmd, args, output }) => {
	if (cmd === CAT) {
		try {
			const content = await readFile(path.join(cwd(), args[0]));

			output.write(`${content.toString('utf-8')}\n`);
		} catch (e) {
			output.write(EXECUTION_ERROR);
		}

		// Test case:
		// -- success --
		// cat files/fileToCompress.txt
		// -- fail --
		// cat sfdfads
	}

	if (cmd === ADD) {
		const file = args[0];
		open(file, 'wx', (err, fd) => {
			try {
				if (err?.code === ERR_CODE_EXIST) {
					throw new Error(EXECUTION_ERROR);
				}

				writeFile(fd, "", 'utf8', (err) => {
					if (!err) return close(fd, (err) => {
						if (!err) output.write(FILE_CREATED_MESSAGE);
					});
				});
			} catch (e) {
				output.write(EXECUTION_ERROR);
			}

			// Test case:
			// -- success --
			// add files/newFile.txt
			// -- fail --
			// add files/newFile.txt again
		});
	}

	if (cmd === RN) {
		const [from, to] = args;

		const oldName = path.join(cwd(), from);
		const newName = path.join(cwd(), to);

		try {
			await rn(oldName, newName);
		} catch (e) {
			output.write(EXECUTION_ERROR);
		}

		// Test case:
		// -- sucess --
		// rn files/renameMe.txt files/iWasRenamed.txt
		// -- fail --
		// rn asfsa asfasf
	}

	if (cmd === CP) {
		const [from, to] = args;
		const copyFrom = path.join(cwd(), from);
		const copyTo = path.join(cwd(), to);

		const copyRecursiveSync = (src, dest) => {
			try {
				if (!existsSync(src)) throw new Error(EXECUTION_ERROR);
				if (existsSync(dest)) throw new Error(EXECUTION_ERROR);

				const stats = statSync(src);
				const isDirectory = stats.isDirectory();

				if (isDirectory) {
					mkdirSync(dest);
					return readdirSync(src).forEach((fileName) => copyRecursiveSync(path.join(src, fileName), path.join(dest, fileName)));
				} else {
					return copyFileSync(src, dest);
				}
			} catch (e) {
				output.write(e.toString());
			}
		}

		copyRecursiveSync(copyFrom, copyTo);

		// Test case:
		// -- success --
		// cp files/fileToCompress.txt files/fileToCompressCopy.txt
		// -- fail --
		// cp sdfsd sdfsdf
	}

	if (cmd === MV) {
		const [from, to] = args;
		const sourceFrom = path.join(cwd(), from);
		const destTo = path.join(cwd(), to);

		const source = createReadStream(sourceFrom);
		const dest = createWriteStream(destTo);

		source.pipe(dest);

		source.on('error', () => output.write(EXECUTION_ERROR));

		// Test case:
		// -- sucess --
		// mv files/moveMe.txt files/folderForMoving/moveMe
		// -- fail --
		// mv afdsf dsfsdf
	}

	if (cmd === RM) {
		const file = args[0];

		try {
			await rm(file);
		} catch (e) {
			output.write(EXECUTION_ERROR);
		}

		// Test case:
		// -- sucess --
		// rm files/deleteMe.txt
		// -- fail --
		// rm afdsf
	}
}
