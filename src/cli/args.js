#!/usr/bin/env node

export const parseArgs = () => {
  const VARIABLE_PATTERN = /^--/;

  const args = process.argv.slice(2).reduce((acc, arg, cur, arr) => {
    if (arg.match(VARIABLE_PATTERN)) {
      acc[arg.substring(2)] = true
      acc['_lastkey'] = arg.substring(2)
    } else {
      if (arg.match(/^-[^-]/)) {
        for (key of arg.substring(1).split('')) {
          acc[key] = true
          acc['_lastkey'] = key
        }
      } else {
        if (acc['_lastkey']) {
          acc[acc['_lastkey']] = arg
          delete acc['_lastkey']
        } else {
          acc[arg] = true
        }
      }
    }

    if (cur == arr.length - 1)
      delete acc['_lastkey']
    return acc
  }, {})


  console.info(Object.entries(args).map(([key, val]) => `${key} is ${val}`).join(', '));

};

parseArgs();