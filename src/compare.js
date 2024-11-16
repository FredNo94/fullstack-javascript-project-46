function compare(file1, file2) {
  const iter = (fileOne, fileTwo) => {
    const keys = [...new Set([...Object.keys(fileOne), ...Object.keys(fileTwo)])].sort();
    const result = keys.map((keyN) => {
      if (typeof fileOne[keyN] === 'object' && typeof fileTwo[keyN] === 'object' && fileOne[keyN] !== null && fileTwo[keyN] !== null) {
        return { key: keyN, value: iter(fileOne[keyN], fileTwo[keyN]), state: 'unchanged' };
      } if (fileTwo[keyN] === undefined) {
        return { key: keyN, value: fileOne[keyN], state: 'deleted' };
      } if (fileOne[keyN] === undefined) {
        return { key: keyN, value: fileTwo[keyN], state: 'added' };
      } if (fileOne[keyN] !== fileTwo[keyN]) {
        return [{ key: keyN, value: fileOne[keyN], state: 'deleted' }, { key: keyN, value: fileTwo[keyN], state: 'added' }];
      }
      return { key: keyN, value: fileOne[keyN], state: 'unchanged' };
    });
    return result.flat();
  };
  return iter(file1, file2);
}

export default compare;
