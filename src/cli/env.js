#!/usr/bin/env node

const VARIABLE_PATTERN = '^RSS_'
const DELIMITER = '='

export const parseEnv = () => {
    const rss_envs = Object.entries(process.env).filter(([key]) => key.match(VARIABLE_PATTERN));
    console.log(rss_envs.map(([key, val]) => `${key}${DELIMITER}${val}`).join("; "));
};

parseEnv();