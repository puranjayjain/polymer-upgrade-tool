// contains the replacement map and helper methods

const brackets = {
  'curly': {
    'start': '{',
    'end': '}'
  },
  'square': {
    'start': '[',
    'end': ']'
  },
  'angle': {
    'start': '<',
    'end': '>'
  }
}

module.exports = [
  // is
  {
    'search': /(is)(?:(?:\s+)?:)(.*)(?:,)/i,
    'delimiters': false,
    'type': 'staticGet'
  },
  // properties
  {
    'search': /(properties)((\s+)?:)/i,
    'delimiters': brackets.curly,
    'type': 'staticGet'
  },
  // observers
  {
    'search': /(observers)((\s+)?:)/i,
    'delimiters': brackets.square,
    'type': 'staticGet'
  },
  // : function =>
  // {
  //   'from': /(\s+)?:(\s+)?function(\s+)?/igm,
  //   'to': ' '
  // }
];
