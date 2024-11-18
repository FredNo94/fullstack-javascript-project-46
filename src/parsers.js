import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

function parseFile(file) {
  const format = path.extname(file);

  if (format === '.json') {
    return JSON.parse(readFileSync(file));
  } if (format === '.yml' || format === '.yaml') {
    return yaml.load(readFileSync(file));
  }
  return undefined;
}

export default parseFile;
