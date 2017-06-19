module.exports = function(list) {
  let item,
    element,
    added = [],
    methods = {
      '0': '',
      '1': '',
      '2': ''
    };

  const addMethodObject = (tag, method) => {
    let listener,
      addListener,
      type;

    // if element has two values means we have a child instead of the host
    if (tag.length > 1) {
      element = `this.$.${tag[0]}`;
      type = tag[1];
    } else {
      element = `this`;
      type = tag[0];
    }

    // name event binded listener
    listener = `_listener${method}`;
    
    // should add a new bound listener or npt
    if (added.indexOf(listener) > -1) {
      addListener = false;
    } else {
      added.push(listener);
      addListener = true;
    }

    return {addListener: addListener, listener: listener, element: element, type: type, method: method};
  }

  const createMethodObject = ({addListener, listener, element, type, method}) => {
    let current = '';

    if (addListener) {
      current = `this.${listener} = ${element}.${method}.bind(this);`;
    }
    
    return [current, `${element}.addEventListener('${type}', this.${listener});`, `${element}.removeEventListener('${type}', this.${listener});`];
  }

  for (item in list) {
    element = createMethodObject(addMethodObject(item.split('.'), list[item]));
    
    methods = {
      '0': `${methods['0']}
          ${element[0]}      
        `,
      '1': `${methods['1']}
          ${element[1]}      
        `,
      '2': `${methods['2']}
          ${element[2]}      
        `
    };
  }

  return `
    constructor() {
      super();
      
      ${methods['0']}
    }
    
    connectedCallback() {
      super.connectedCallback();
      
      ${methods['1']}
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      
      ${methods['2']}  
    }
  `;
}
