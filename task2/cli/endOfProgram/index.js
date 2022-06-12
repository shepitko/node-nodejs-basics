export const endOfProgram = ({ inputStr, msg }) => {
	const posiibleEndProgramKeys = exitCmds;

	if (posiibleEndProgramKeys.includes(inputStr)) {
		output.write(msg);
		process.exit();
	}
}