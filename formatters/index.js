import plain from './plain.js';
import stylish from './stylish.js';

function outputInFormat(format, file) {
  switch (format.format) {
    case 'plain':
      return plain(file);
    default:
      return stylish(file);
  }
}

export default outputInFormat;
