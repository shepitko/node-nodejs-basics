#!/usr/bin/env node

const VARIABLE_PATTERN = '^RSS'
const DELIMITER = '='

export const parseEnv = () => {

    const args = process.argv.slice(2).reduce((acc, arg, cur, arr) => {
        // Ignoring variables that do not start with RSS
        if (arg.match(VARIABLE_PATTERN)) {
            if (arg.match(DELIMITER)) {
                const [key, value] = arg.split(DELIMITER);
                acc.push({ key, value });
            } else {
                // Variable without value must be boolean
                acc.push({ key: arg, value: true })
            }
        }

        return acc
    }, [])


    console.info(args.map(({ key, value }) => `${key}=${value}`).join("; "));
};

parseEnv();