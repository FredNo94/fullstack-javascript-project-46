function getValuesInFormat(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
}

function plain(inputData) {
  const iter = (data, path) => {
    if (Array.isArray(data)) {
      const lines = data.map((node) => {
        const [value, newValue] = [getValuesInFormat(node.value), getValuesInFormat(node.newValue)];
        const filepath = path.concat(node.key).join('.');
        switch (node.state) {
          case 'changed':
            return `Property '${filepath}' was updated. From ${value} to ${newValue}`;
          case 'added':
            return `Property '${filepath}' was added with value: ${value}`;
          case 'deleted':
            return `Property '${filepath}' was removed`;
          default:
            return iter(node.value, [filepath]);
        }
      });
      return lines.filter((element) => element !== undefined).join('\n');
    }
    return undefined;
  };
  return iter(inputData, []);
}

export default plain;
