const XRegExp = require('xregexp');

const staticGet = require('../templates/staticGet.js');

module.exports = function(string, item) {
  match = XRegExp.exec(string, item.search);
  // assumes the type is staticGet
  string = XRegExp.replace(string, item.search, staticGet(match[1], match[2]));

  return string;
}