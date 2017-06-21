# polymer-upgrade-tool
a command line tool that helps you upgrade your polymer project from 1.x to pure 2.x class style elements

# installation

Use npm

```
npm i --save-dev polymer-upgrade-tool
```

or use yarn

```
yarn add -D polymer-upgrade-tool
```

# Usage example

`

`

# The following transformations occur to your elements / behaviors

## HTML

- [x] 

## Javascript

- [x] `static get` is declaration
- [x] Normal getters and setters
- [x] `properties` object
- [x] `observers` object
- [x] fixed `function` definitions
- [x] `listeners` object is converted into `addEventListener` and `removeEventListener` with bound event listeners
- [x] `Polymer.dom(this.root)` -> `this.shadowRoot`
- [x] `this.$$` -> `this.shadowRoot.querySelector`
- [x] `Polymer.instanceof` -> `instanceof`
- [x] `Polymer.dom(event).localTarget` -> `event.target`
- [x] `Polymer.dom(event).path` -> `event.composedPath()`
- [x] `Polymer.dom(event).rootTarget` -> `event.composedPath()[0]`
- [x] `serialize` and `deserialize` statements are converted into `_serializeValue` and `_deserializeValue`
- [x] `Polymer.dom(this).observeNodes(this._nodesChanged)` -> `new Polymer.FlattenedNodesObserver(this._nodesChanged)`