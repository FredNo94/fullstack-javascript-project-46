import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

function outputInFormat(format, file) {
  switch (format.format) {
    case 'plain':
      return plain(file);
    case 'json':
      return json(file);
    case 'stylish':
      return stylish(file);
    default:
      return new Error(`Invalid format ${format.format}`);
  }
}

export default outputInFormat;
