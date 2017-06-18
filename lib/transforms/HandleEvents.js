const XRegExp = require('xregexp');
const balancedMatch = require('balanced-match');

const replaceIfExists = require('../helpers/replaceIfExists.js');

module.exports = function(string, item) {
  let pre,
    middle,
    match,
    balanced,
    stringStart;

  // get the matching string
  match = XRegExp.match(string, item.search, 'one');
  // get the matched string's end position
  stringStart = string.indexOf(match) + match.length;

  return string;
}