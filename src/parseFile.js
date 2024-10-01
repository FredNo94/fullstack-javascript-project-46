import { readFileSync } from 'node:fs';

function parseFile(file) {
  const obj = JSON.parse(readFileSync(file));

  return obj;
}

export default parseFile;
