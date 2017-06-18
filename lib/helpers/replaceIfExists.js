module.exports = function (string, replace, replacement) {
  if (string.indexOf(replace) > -1) {
    string = string.replace(replace, replacement);
  }
  return string;
}