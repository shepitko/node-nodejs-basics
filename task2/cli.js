import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { endOfProgram } from './cli/endOfProgram/index.js';
import { handleFileBaseActions } from './cli/files/index.js';
import { handleHashActions } from './cli/hash/index.js';
import { handleNavigationActions } from './cli/navigation/index.js';

import { whereAmI } from './cli/navigation/whereAmI.js';
import { handleOSActions } from './cli/os/index.js';
import { handleZipActions } from './cli/zip/index.js';
import { baseFileOpersCmds, exitCmds, hashCmds, listOfCommands, navigationCmds, osCmds, zipCmds } from './enums/commands.js';
import { FAREWELL, GREETING, WRONG_COMMAND } from './enums/messages.js';
import { getUserName } from './helpers/args.js';
import { interpolateMessage } from './helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initProgram = () => {
	const input = process.stdin;
	const output = process.stdout;

	const userName = getUserName();
	const farewellMsg = interpolateMessage({ str: FAREWELL, vars: { userName } });
	const greetingMsg = interpolateMessage({ str: GREETING, vars: { userName } });

	// Show greeting message + path
	output.write(greetingMsg);
	whereAmI({ path: __dirname, output });

	// Main input controller/switcher
	input.on('data', (data) => {
		const inputStr = data.toString().replace(/(\r\n|\n|\r)/gm, ""); // Remove line breaks;
		const [cmd, ...args] = inputStr.split(" ") || [];

		try {
			if (!listOfCommands.includes(cmd)) throw new Error(WRONG_COMMAND);

			if (navigationCmds.includes(cmd)) return handleNavigationActions({ cmd, args, output });
			if (baseFileOpersCmds.includes(cmd)) return handleFileBaseActions({ cmd, args, output });
			if (osCmds.includes(cmd)) return handleOSActions({ args, output });
			if (hashCmds.includes(cmd)) return handleHashActions({ args, output });
			if (zipCmds.includes(cmd)) return handleZipActions({ cmd, args, output });

			endOfProgram({ inputStr, msg: farewellMsg, output });
		} catch (error) {
			output.write(error.toString());
		}
	});

	// End program
	process.on('SIGINT', () => {
		output.write(farewellMsg);
		process.exit();
	});

}

initProgram();
