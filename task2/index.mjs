import { FAREWELL, GREETING } from './enums/messages.js';
import { getUserName } from './helpers/args.js';
import { interpolateMessage } from './helpers/utils.js';



const initProgram = () => {
	const input = process.stdin;
	const output = process.stdout;

	const userName = getUserName();
	const farewellMsg = interpolateMessage({ str: FAREWELL, vars: { userName } });

	output.write(interpolateMessage({ str: GREETING, vars: { userName } }));


	// End program
	process.on('SIGINT', () => {
		output.write(farewellMsg);
		process.exit();
	});


	const doAlternativeEndProcess = (inputStr) => {
		const posiibleEndProgramKeys = ['close', 'CLOSE', 'exit', 'EXIT', ':q'];

		if (posiibleEndProgramKeys.includes(inputStr)) {
			output.write(farewellMsg);
			process.exit();
		}
	}

	input.on('data', (data) => {
		const inputStr = data.toString().replace(/(\r\n|\n|\r)/gm, ""); // Remove line breaks;
		try {
			// handleNavigationActions();
			// handleFileBaseActions();
			// handleOSActions();
			// handleHashActions();
			// handleZipActions();

			doAlternativeEndProcess(inputStr);
		} catch (error) {
			output.write(error)
		}
	});

}

initProgram();
