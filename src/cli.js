import { program } from 'commander';
import genDiff from './index.js';

function cliGenDiff() {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .argument('<filepath1>', 'Введите путь до первого файла')
    .argument('<filepath2>', 'Введите путь до второго файла')
    .action((filepath1, filepath2, type) => {
      const result = genDiff(filepath1, filepath2, type);
      console.log(result);
    });
  program.parse();
}

export default cliGenDiff;
