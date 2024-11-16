function getState(state) {
  switch (state) {
    case 'added':
      return '+';
    case 'deleted':
      return '-';
    case 'unchanged':
      return ' ';
    default:
      return ' ';
  }
}

function formatter(inputData, type, spacesCount = 4) {
  const replacer = ' ';

  const iter = (data, depth) => {
    if (typeof data !== 'object' || data === null) {
      return `${data}`;
    }
    const closingDepth = replacer.repeat(depth * spacesCount - spacesCount);

    if (Array.isArray(data)) {
      const lines = data.map((node) => {
        const state = getState(node.state);
        const depthValue = replacer.repeat(depth * spacesCount - 2);
        return `${depthValue}${state} ${node.key}: ${iter(node.value, depth + 1)}`;
      });
      return ['{', ...lines, `${closingDepth}}`].join('\n');
    }

    const lines = Object.entries(data).map(([key, value]) => {
      const depthValue = replacer.repeat(depth * spacesCount - 2);
      return `${depthValue}  ${key}: ${iter(value, depth + 1)}`;
    });

    return ['{', ...lines, `${closingDepth}}`].join('\n');
  };
  return iter(inputData, 1);
}

export default formatter;
