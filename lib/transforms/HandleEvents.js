const XRegExp = require('xregexp');
const balancedMatch = require('balanced-match');

const getListeners = require('../templates/listeners.js');
const replaceIfExists = require('../helpers/replaceIfExists.js');

module.exports = function(string, item) {
  let pre,
    middle,
    match,
    balanced,
    stringStart,
    element,
    listeners;

  // get the matching string
  match = XRegExp.match(string, item.search, 'one');

  // get the matched string's end position
  stringStart = string.indexOf(match) + match.length;
  middle = string.substring(stringStart);

  // get the matching brackets
  balanced = balancedMatch(item.delimiters.start, item.delimiters.end, middle);
  match = XRegExp.exec(string, item.search, 'one').index;
  pre = string.substring(0, match);
  // get the listeners into a JSON format and parse to get the actual listeners
  listeners = JSON.parse(`${item.delimiters.start}${balanced.body}${item.delimiters.end}`.replace(/'/g, '"'));
  element = getListeners(listeners);

  string = `${pre}${element}${replaceIfExists(balanced.post, ',', '')}`;

  return string;
}