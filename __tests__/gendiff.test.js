// import gendiff from '../src/index.js';
// import parseFile from '../src/parseFile.js';
import compare from '../src/compare.js';

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
