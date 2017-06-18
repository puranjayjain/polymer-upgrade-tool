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
    'type': 'Is'
  },
  // properties
  {
    'search': /(properties)((\s+)?:)/i,
    'delimiters': brackets.curly,
    'type': 'StaticGet'
  },
  // observers
  {
    'search': /(observers)((\s+)?:)/i,
    'delimiters': brackets.square,
    'type': 'StaticGet'
  },
  // : function =>
  {
    'search': [
      '(?<!value|type)', /(\s+)?\:(\s+)?(function(\s+)?)/i
    ],
    'delimiters': brackets.curly,
    'type': 'Remove'
  },
  // listeners => add and remove listeners
  {
    'search': /(listeners)((\s+)?:)/i,
    'delimiters': brackets.curly,
    'type': 'HandleEvents'
  }
];
