
function compare(file1, file2) {
    let result = `\n`;
    const keys = [...new Set([...getKeys(file1), ...getKeys(file2)])];

    for(let i = 0; i < keys.length; i++) {
        if(file1[keys[i]] === undefined) {
            result += `  + ${keys[i]}: ${file2[keys[i]]}\n`;
        } else if(file2[keys[i]] === undefined) {
            result += `  - ${keys[i]}: ${file1[keys[i]]}\n`;
        } else if(file1[keys[i]] === file2[keys[i]]) {
            result += `    ${keys[i]}: ${file1[keys[i]]}\n`;
        } else if(file1[keys[i]] !== file2[keys[i]]) {
            result += `  - ${keys[i]}: ${file1[keys[i]]}\n`;
            result += `  + ${keys[i]}: ${file2[keys[i]]}\n`;
        }
    }
    console.log(`{${result}}`)
    return result;
}

function getKeys(obj) {
    const result = [];
    for(const key in obj) {
        result.push(key);
    }

    return result;
}

export { compare };