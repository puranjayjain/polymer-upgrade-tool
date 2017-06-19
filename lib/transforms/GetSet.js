const XRegExp = require('xregexp');
const balancedMatch = require('balanced-match');

const replaceIfExists = require('../helpers/replaceIfExists.js');

module.exports = function(string, item) {
  let pre,
    middle,
    match,
    innermatch,
    matches,
    balanced,
    stringStart;

  // get the matching string
  matches = XRegExp.match(string, item.search, 'all');
  for (match of matches) {
    // get the matched string's end position
    stringStart = string.indexOf(match) + match.length;
    middle = string.substring(stringStart);
    // get the matching brackets
    balanced = balancedMatch(item.delimiters.start, item.delimiters.end, middle);
    console.log(XRegExp.exec(string, XRegExp(match), 'one').index);
    console.log(XRegExp.exec(string, XRegExp(match), 'one').index);
    innermatch = XRegExp.exec(string, XRegExp(match), 'one').index;
    pre = string.substring(0, innermatch);
    innermatch = XRegExp.match(string, XRegExp(match), 'one');
    string = `${pre}${innermatch}${item.delimiters.start}${balanced.body}${item.delimiters.end}${replaceIfExists(balanced.post, ',', '')}`;
  }

  return string;
}