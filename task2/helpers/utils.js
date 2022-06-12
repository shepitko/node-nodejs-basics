/**
 * interpolateMessage - get string with variables and replace to specified vars 
 * 
 * @param {Object} template - The employee who is responsible for the project.
 * @param {string} template.str - string with template like {var}.
 * @param {Object} template.vars - Object of replacer:value e.g. { name: 'yurii' }.
 * 
 * @return {string} 
 */
export const interpolateMessage = ({ str, vars }) => {
	const interpolateVars = (string, values) => string.replace(/{(.*?)}/g, (match, offset) => values[offset]);

	return interpolateVars(str, vars);
};
