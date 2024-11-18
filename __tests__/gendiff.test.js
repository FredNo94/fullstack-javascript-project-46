import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import parseFile from '../src/parsers.js';
import compare from '../src/compare.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Compare normal file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = [{ key: 'one', state: 'deleted', value: 'test comment' }, { key: 'two', state: 'added', value: 'test comment 2' }];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Check function compare with empty file', () => {
  const testFile1 = {};
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = [{ key: 'two', state: 'added', value: 'test comment 2' }];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare with second empty file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = {};
  const referenceResult = [{ key: 'one', state: 'deleted', value: 'test comment' }];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Compare all file empty', () => {
  const testFile1 = {};
  const testFile2 = {};
  const referenceResult = [];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Check parse file', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile1.json`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Check file in format yaml', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile3.yaml`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Check format yml', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile4.yml`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 45, lastname: 'wolf', name: 'Wolf', proxy: '111.234.53.22', test: false,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Check compare normal file with same data', () => {
  const testFile1 = { one: 'test comment 2' };
  const testFile2 = { one: 'test comment 2' };
  const referenceResult = [{ key: 'one', state: 'unchanged', value: 'test comment 2' }];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Check function compare same key', () => {
  const testFile1 = { one: 'test comment 2' };
  const testFile2 = { one: 'test comment 20' };
  const referenceResult = [{
    key: 'one', value: 'test comment 2', newValue: 'test comment 20', state: 'changed',
  }];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test check output in json format', () => {
  const pathOne = `${__dirname}/../__fixtures__/testFile5.json`;
  const pathTwo = `${__dirname}/../__fixtures__/testFile6.json`;
  expect(() => { JSON.parse(genDiff(pathOne, pathTwo, 'json')); }).not.toThrow();
});

test.each([
  ['testFile5.json', 'testFile6.json', 'default', 'resultCompareFile'], // [input1, input2, expectedResult]
  ['testFile7.yaml', 'testFile8.yml', 'default', 'resultCompareFile'],
  ['testFile5.json', 'testFile6.json', 'plain', 'resultComparePlain'],
])('Test gendiff value %s and %s in format %s', (fileOne, fileTwo, format, result) => {
  const pathOne = `${__dirname}/../__fixtures__/${fileOne}`;
  const pathTwo = `${__dirname}/../__fixtures__/${fileTwo}`;
  const pathResolve = `${__dirname}/../__fixtures__/${result}`;
  const referenceResult = readFileSync((pathResolve), 'utf8');
  expect(genDiff(pathOne, pathTwo, format)).toEqual(referenceResult);
});
