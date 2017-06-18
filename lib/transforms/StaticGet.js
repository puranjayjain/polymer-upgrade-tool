const XRegExp = require('xregexp');
const balancedMatch = require('balanced-match');

const staticGet = require('../templates/staticGet.js');
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
  pre = string.substring(0, string.indexOf(match) - 1);
  middle = string.substring(stringStart);
  // get the matching brackets
  balanced = balancedMatch(item.delimiters.start, item.delimiters.end, middle);
  match = XRegExp.exec(string, item.search);
  string = `${pre}${middle}${balanced.post}`;
  middle = staticGet(match[1], `${item.delimiters.start}${balanced.body}${item.delimiters.end}`);
  string = `${pre}${middle}${replaceIfExists(balanced.post, ',', '')}`;

  return string;
}