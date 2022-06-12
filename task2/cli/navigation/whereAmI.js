import { CURRENT_DIRECTORY } from '../../enums/messages.js';
import { interpolateMessage } from '../../helpers/utils.js';

export const whereAmI = ({ path, output }) => {
	output.write(interpolateMessage({ str: CURRENT_DIRECTORY, vars: { path } }));
}