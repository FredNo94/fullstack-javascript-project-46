import { program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format')
    .argument('<filepath1>', 'Введите путь до первого файла')
    .argument('<filepath2>', 'Введите путь до второго файла')
    .action((filepath1, filepath2) => {
        console.log(filepath1, filepath2)
    });
    
program.parse();

export default program.gendiff;
