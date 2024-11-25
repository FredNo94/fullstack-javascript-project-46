import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import parseFile from '../src/parsers.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getPath(file) {
  return `${__dirname}/../__fixtures__/${file}`;
}

test.each([
  ['testFile1.json', {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  }],
  ['testFile3.yaml', {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  }],
  ['testFile4.yml', {
    age: 45, lastname: 'wolf', name: 'Wolf', proxy: '111.234.53.22', test: false,
  }],
])('Check parse file %s', (file, result) => {
  const currentPath = getPath(file);
  const testFile = resolve(currentPath);
  expect(parseFile(testFile)).toMatchObject(result);
});

test('JSON format check', () => {
  const pathOne = getPath('testFile5.json');
  const pathTwo = getPath('testFile6.json');
  expect(() => { JSON.parse(genDiff(pathOne, pathTwo, 'json')); }).not.toThrow();
});

test.each([
  ['testFile5.json', 'testFile6.json', 'stylish', 'resultCompareFile'], // [input1, input2, expectedResult]
  ['testFile7.yaml', 'testFile8.yml', 'stylish', 'resultCompareFile'],
  ['testFile5.json', 'testFile6.json', 'plain', 'resultComparePlain'],
])('Work gendiff with value %s and %s in format %s', (fileOne, fileTwo, format, result) => {
  const pathOne = getPath(fileOne);
  const pathTwo = getPath(fileTwo);
  const pathResolve = getPath(result);
  const referenceResult = readFileSync((pathResolve), 'utf8');
  expect(genDiff(pathOne, pathTwo, format)).toEqual(referenceResult);
});
