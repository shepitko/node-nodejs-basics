import { EOL, homedir, cpus, userInfo, arch } from 'os';
import {
	osSubCmds,
	OS_ARCHITECTURE, OS_CPUS, OS_EOL, OS_HOMEDIR, OS_USERNAME,
} from '../../enums/commands.js';
import { WRONG_COMMAND } from '../../enums/messages.js';

export const handleOSActions = ({ args, output }) => {
	if (!osSubCmds.includes(args[0])) throw new Error(WRONG_COMMAND);

	if (args[0] === OS_EOL) {
		output.write(`${JSON.stringify(EOL)}\n`);
	}

	if (args[0] === OS_CPUS) {
		const cpuInfo = cpus();
		const cpuDesc = `
Amount of CPUs: ${cpuInfo.length}\n
${cpuInfo.map((cpu, idx) => `${idx + 1} | ${cpu.model} | ${cpu.speed} MHz |`).join('\n')}
`;

		output.write(cpuDesc);
	}

	if (args[0] === OS_HOMEDIR) {
		output.write(`${homedir()}\n`);
	}

	if (args[0] === OS_USERNAME) {
		output.write(`${userInfo().username}\n`);
	}

	if (args[0] === OS_ARCHITECTURE) {
		output.write(`${arch()}\n`);
	}
}
