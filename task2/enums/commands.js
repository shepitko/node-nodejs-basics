export const UP = "up";
export const LS = "ls";
export const CD = "cd";

export const navigationCmds = [UP, CD, LS];
export const baseFileOpersCmds = ["cat", "add", "rn", "cp", "mv", "rm"];
export const osCmds = ["os"];
export const osSubCmds = ["--EOL", "--cpus", '--homedir', '--username', '--architecture'];
export const hashCmds = ["hash"];
export const zipCmds = ["compress", "decompress"];
export const exitCmds = ['close', 'CLOSE', 'exit', 'EXIT', ':q'];

export const listOfCommands = [
	...navigationCmds,
	...baseFileOpersCmds,
	...osCmds,
	...osSubCmds,
	...hashCmds,
	...zipCmds,
	...exitCmds,
];
