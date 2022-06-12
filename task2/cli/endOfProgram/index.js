import { exitCmds } from '../../enums/commands.js';

export const endOfProgram = ({ inputStr, msg, output }) => {
	const posiibleEndProgramKeys = exitCmds;

	if (posiibleEndProgramKeys.includes(inputStr)) {
		output.write(msg);
		process.exit();
	}
}