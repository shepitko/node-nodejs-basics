export const UP = "up";
export const LS = "ls";
export const CD = "cd";

export const CAT = "cat";
export const ADD = "add";
export const RN = "rn";
export const CP = "cp";
export const MV = "mv";
export const RM = "rm";

export const OS = "os";
export const OS_EOL = "--EOL";
export const OS_CPUS = "--cpus";
export const OS_HOMEDIR = "--homedir";
export const OS_USERNAME = "--username";
export const OS_ARCHITECTURE = "--architecture";

export const HASH = "hash";

export const COMPRESS = "compress";
export const DECOMPRESS = "decompress";

export const navigationCmds = [UP, CD, LS];
export const baseFileOpersCmds = [CAT, ADD, RN, CP, MV, RM];
export const osCmds = [OS];
export const osSubCmds = [OS_EOL, OS_CPUS, OS_HOMEDIR, OS_USERNAME, OS_ARCHITECTURE];
export const hashCmds = [HASH];
export const zipCmds = [COMPRESS, DECOMPRESS];
export const exitCmds = ['close', 'CLOSE', 'exit', 'EXIT', ':q'];

export const listOfCommands = [
	...navigationCmds,
	...baseFileOpersCmds,
	...osCmds,
	...hashCmds,
	...zipCmds,
	...exitCmds,
];
