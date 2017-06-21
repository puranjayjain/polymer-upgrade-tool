// contains the replacement map and helper methods

module.exports = [
  // <dom-module name="my-element"> or <dom-module is="my-element"> => <dom-module id="my-element">
  {
    'search': /(<dom\-module (name|is)=")(.*)(">)/igm,
    'replacement': '<dom-module id="$3">',
    'type': 'Replace'
  }
];
