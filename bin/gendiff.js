#!/usr/bin/env node

import { program } from 'commander';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import parseFile from '../src/parsers.js';
import compare from '../src/compare.js';
import outputInFormat from '../formatters/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>', 'Введите путь до первого файла')
  .argument('<filepath2>', 'Введите путь до второго файла')
  .action((filepath1, filepath2, type) => {
    const currentPath = cwd();
    const fileOne = resolve(currentPath, 'utils', filepath1);
    const fileTwo = resolve(currentPath, 'utils', filepath2);
    const objOne = parseFile(fileOne);
    const objTwo = parseFile(fileTwo);
    const resultCompare = compare(objOne, objTwo);
    console.log(outputInFormat(type, resultCompare));
  });

program.parse(process.argv);
