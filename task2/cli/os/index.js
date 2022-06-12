import { EOL, homedir, cpus, userInfo, arch } from 'os';
import {
	osSubCmds,
	OS_ARCHITECTURE, OS_CPUS, OS_EOL, OS_HOMEDIR, OS_USERNAME,
} from '../../enums/commands.js';
import { WRONG_COMMAND } from '../../enums/messages.js';

export const handleOSActions = ({ cmd, args, output }) => {
	if (!osSubCmds.includes(args)) throw new Error(WRONG_COMMAND);

	if (args === OS_EOL) {
		output.write(`${JSON.stringify(EOL)}\n`);
	}

	if (args === OS_CPUS) {
		const cpuInfo = cpus();
		const cpuDesc = `
Amount of CPUs: ${cpuInfo.length}\n
${cpuInfo.map((cpu, idx) => `${idx + 1} | ${cpu.model} | ${cpu.speed} MHz |`).join('\n')}
`;

		output.write(cpuDesc);
	}

	if (args === OS_HOMEDIR) {
		output.write(`${homedir()}\n`);
	}

	if (args === OS_USERNAME) {
		output.write(`${userInfo().username}\n`);
	}

	if (args === OS_ARCHITECTURE) {
		output.write(`${arch()}\n`);
	}
}
