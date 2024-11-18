import { cwd } from 'node:process';
import { resolve } from 'node:path';
import parseFile from './parsers.js';
import compare from './compare.js';
import outputInFormat from '../formatters/index.js';

function genDiff(filepath1, filepath2, type = 'stylish') {
  const currentPath = cwd();
  const fileOne = resolve(currentPath, 'utils', filepath1);
  const fileTwo = resolve(currentPath, 'utils', filepath2);
  const objOne = parseFile(fileOne);
  const objTwo = parseFile(fileTwo);
  const resultCompare = compare(objOne, objTwo);
  return outputInFormat({ format: type }, resultCompare);
}

export default genDiff;
