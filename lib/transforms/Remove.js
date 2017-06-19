const XRegExp = require('xregexp');
const balancedMatch = require('balanced-match');
const _ = require('lodash');

const replaceIfExists = require('../helpers/replaceIfExists.js');

// merge the lookbehind extension
_.merge(XRegExp, require('xregexp-lookbehind'));

module.exports = function(string, item) {
  let pre,
    middle,
    match,
    balanced,
    stringStart;

  while (1) {
    // get the matching string
    match = XRegExp.testLb(string, ...item.search);
    if (match) {
      match = XRegExp.searchLb(string, ...item.search);
      // get the matched string's end position
      stringStart = match + XRegExp.execLb(string, ...item.search)[0].length;
      middle = string.substring(stringStart);
      pre = `${string.substring(0, match)}${string.substring(stringStart, string.indexOf(item.delimiters.start, stringStart))}`;
      // get the matching brackets
      balanced = balancedMatch(item.delimiters.start, item.delimiters.end, middle);
      middle = `${item.delimiters.start}${balanced.body}${item.delimiters.end}`;
      string = `${pre}${middle}${replaceIfExists(balanced.post, ',', '')}`;
    } else {
      break;
    }
  }

  return string;
}