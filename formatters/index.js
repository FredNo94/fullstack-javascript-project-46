import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

function outputInFormat(format, file) {
  switch (format.format) {
    case 'plain':
      return plain(file);
    case 'json':
      return json(file);
    default:
      return stylish(file);
  }
}

export default outputInFormat;
