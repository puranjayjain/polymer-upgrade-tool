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
  // get and set =>
  {
    'search': /(get|set)(\s+.*)(\(\))/,
    'delimiters': brackets.curly,
    'type': 'GetSet'
  },
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
  },
  // Polymer.dom(this.root) => this.shadowRoot
  {
    'search': /Polymer\.dom\(this\.root\)/igm,
    'replacement': 'this.shadowRoot',
    'type': 'Replace'
  },
  // this.$$ => this.shadowRoot.querySelector
  {
    'search': /this\.\$\$/igm,
    'replacement': 'this.shadowRoot.querySelector',
    'type': 'Replace'
  },
  // Polymer.instanceof => instanceof
  {
    'search': /Polymer\.instanceof/igm,
    'replacement': 'instanceof',
    'type': 'Replace'
  },
  // Polymer.dom(event).localTarget => event.target
  {
    'search': /(Polymer\.dom\()(.*)(\)\.localTarget)/igm,
    'replacement': '$2.target',
    'type': 'Replace'
  },
  // Polymer.dom(event).path => event.composedPath()
  {
    'search': /(Polymer\.dom\()(.*)(\)\.path)/igm,
    'replacement': '$2.composedPath()',
    'type': 'Replace'
  },
  // Polymer.dom(event).rootTarget => event.composedPath()[0]
  {
    'search': /(Polymer\.dom\()(.*)(\)\.rootTarget )/igm,
    'replacement': '$2.composedPath()[0]',
    'type': 'Replace'
  },
];
