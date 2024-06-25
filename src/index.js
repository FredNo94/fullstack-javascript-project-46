import { program } from 'commander';

const gendiff = (valueOne, valueTwo) => {

};

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>');

program.parse();

export default gendiff;
