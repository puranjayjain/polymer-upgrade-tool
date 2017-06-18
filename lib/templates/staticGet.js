module.exports = function(type, content) {
  return `static get ${type} () {
      return ${content};
    }
  `;
}