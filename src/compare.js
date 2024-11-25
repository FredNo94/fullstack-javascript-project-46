import _ from 'lodash';

function compare(fileOne, fileTwo) {
  const keys = _.sortBy([...new Set([...Object.keys(fileOne), ...Object.keys(fileTwo)])]);

  const result = keys.map((keyN) => {
    if (_.isObject(fileOne[keyN]) && _.isObject(fileTwo[keyN])) {
      return { key: keyN, value: compare(fileOne[keyN], fileTwo[keyN]), state: 'unchanged' };
    } if (!_.has(fileTwo, keyN)) {
      return { key: keyN, value: fileOne[keyN], state: 'deleted' };
    } if (!_.has(fileOne, keyN)) {
      return { key: keyN, value: fileTwo[keyN], state: 'added' };
    } if (fileOne[keyN] !== fileTwo[keyN]) {
      return {
        key: keyN, value: fileOne[keyN], newValue: fileTwo[keyN], state: 'changed',
      };
    }
    return { key: keyN, value: fileOne[keyN], state: 'unchanged' };
  });
  return result.flat();
}

export default compare;
