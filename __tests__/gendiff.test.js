import { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import parseFile from '../src/parsers.js';
import compare from '../src/compare.js';
import formatter from '../src/formatter.js';
import { readFileSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('Test function compare with normal file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = [{"key": "one", "state": "deleted", "value": "test comment"}, {"key": "two", "state": "added", "value": "test comment 2"}];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare with first empty file', () => {
  const testFile1 = {};
  const testFile2 = { two: 'test comment 2' };
  const referenceResult = [{"key": "two", "state": "added", "value": "test comment 2"}];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare with second empty file', () => {
  const testFile1 = { one: 'test comment' };
  const testFile2 = {};
  const referenceResult = [{"key": "one", "state": "deleted", "value": "test comment"}];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare all file empty', () => {
  const testFile1 = {};
  const testFile2 = {};
  const referenceResult = [];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test parse file', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile1.json`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Test parse file in format yaml', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile3.yaml`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 30, lastname: 'wolf', name: 'Sashka', proxy: '111.234.53.22', test: true,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Test parse file in format yml', () => {
  const currentPath = `${__dirname}/../__fixtures__/testFile4.yml`;
  const testFile = resolve(currentPath);
  const referenceResult = {
    age: 45, lastname: 'wolf', name: 'Wolf', proxy: '111.234.53.22', test: false,
  };
  expect(parseFile(testFile)).toMatchObject(referenceResult);
});

test('Test function compare with normal file with same data', () => {
  const testFile1 = { one: 'test comment 2' };
  const testFile2 = { one: 'test comment 2' };
  const referenceResult = [{"key": "one", "state": "unchanged", "value": "test comment 2"}];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare with normal file with same key', () => {
  const testFile1 = { one: 'test comment 2' };
  const testFile2 = { one: 'test comment 20' };
  const referenceResult = [{"key": "one", "state": "deleted", "value": "test comment 2"}, {"key": "one", "state": "added", "value": "test comment 20"}];
  expect(compare(testFile1, testFile2)).toEqual(referenceResult);
});

test('Test function compare with depth normal files json', () => {
  const pathOne = `${__dirname}/../__fixtures__/testFile5.json`;
  const pathTwo = `${__dirname}/../__fixtures__/testFile6.json`;
  const pathResolve = `${__dirname}/../__fixtures__/resultCompareFile`;
  const fileOne = parseFile(resolve(pathOne));
  const fileTwo = parseFile(resolve(pathTwo));
  const fileCompare = compare(fileOne, fileTwo);
  const referenceResult = readFileSync((pathResolve), 'utf8');
  expect(formatter(fileCompare)).toBe(referenceResult);
});

test('Test function compare with depth normal files yaml/yml', () => {
  const pathOne = `${__dirname}/../__fixtures__/testFile7.yaml`;
  const pathTwo = `${__dirname}/../__fixtures__/testFile8.yml`;
  const pathResolve = `${__dirname}/../__fixtures__/resultCompareFile`;
  const fileOne = parseFile(resolve(pathOne));
  const fileTwo = parseFile(resolve(pathTwo));
  const fileCompare = compare(fileOne, fileTwo);
  const referenceResult = readFileSync((pathResolve), 'utf8');
  expect(formatter(fileCompare)).toBe(referenceResult);
});