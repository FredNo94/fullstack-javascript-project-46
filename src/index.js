import { program } from 'commander';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import parseFile from './parsers.js';
import compare from './compare.js';

function gendiff() {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>', 'Введите путь до первого файла')
    .argument('<filepath2>', 'Введите путь до второго файла')
    .action((filepath1, filepath2) => {
      const currentPath = cwd();
      const fileOne = resolve(currentPath, 'utils', filepath1);
      const fileTwo = resolve(currentPath, 'utils', filepath2);
      const objOne = parseFile(fileOne);
      const objTwo = parseFile(fileTwo);
      compare(objOne, objTwo);
    });

  program.parse();
}

export default gendiff;
