const getArgs = (args) => {

}

export const getUserName = () => {
	const args = process.argv;
	const userName = args.find(arg => arg.startsWith('--username=')) || "";
	const [_, name] = userName.split('='); // get username

	return name
}