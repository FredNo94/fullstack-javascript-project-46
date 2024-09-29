import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve } from 'node:path';

function parseFile(filepath) {
    const currentPath = cwd();
    const obj = JSON.parse(readFileSync(resolve(currentPath, 'utils', filepath)));

    return obj;
}

export { parseFile }