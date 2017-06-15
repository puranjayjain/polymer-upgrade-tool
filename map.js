// contains the replacement map and helper methods

const staticGet = (type, content) => {
  return `
    static get ${type} () {
      return ${content};
    }
  `;
}

module.exports = [
  {
    'from': /(is)(:\s+)(.*)(,)/ig,
    'to': staticGet('$1', '$3'),
    'once': true
  }
];
