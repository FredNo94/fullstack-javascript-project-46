import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import childProcess from 'child_process';
import parseFile from '../src/parseFile.js';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Test function compare with normal file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = '{\n  - one: test comment\n  + two: test comment 2\n}';
  expect(compare(testFile1, testFile2)).toBe(referenceResult);
});

test('Test function compare with first empty file', () => {
  const testFile1 = {};
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = '{\n  + two: test comment 2\n}';
  expect(compare(testFile1, testFile2)).toBe(referenceResult);
});

test('Test function compare with second empty file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = {};
  const referenceResult = '{\n  - one: test comment\n}';
  expect(compare(testFile1, testFile2)).toBe(referenceResult);
});

test('Test function compare all file empty', () => {
  const testFile1 = {};
  const testFile2 = {};
  const referenceResult = '{\n}';
  expect(compare(testFile1, testFile2)).toBe(referenceResult);
});

test('Test parse file', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile1.json`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Test gendiff', () => {
  const currentPath1 = '../__fixtures__/testFile1.json';
  const currentPath2 = '../__fixtures__/testFile2.json';
  const referenceResult = '\n  - name: Sashka\n  + name: Wolf\n  - age: 30\n  + age: 45\n    proxy: 111.234.53.22\n  - test: true\n  + test: false\n    lastname: wolf\n  + namePet: Cat\n';
  const workResult = childProcess.execSync(`gendiff ${currentPath1} ${currentPath2}`).toString();
  expect(workResult).toMatch(referenceResult);
});
