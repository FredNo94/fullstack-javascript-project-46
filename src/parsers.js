import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

function parseFile(file) {
  let obj;
  const format = path.extname(file);

  if (format === '.json') {
    obj = JSON.parse(readFileSync(file));
  } else if (format === '.yml' || format === '.yaml') {
    obj = yaml.load(readFileSync(file));
  }

  return obj;
}

export default parseFile;
