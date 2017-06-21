'use strict';

const through = require('through2');
const gUtil = require('gulp-util');
const XRegExp = require('xregexp');
const hasProperties = require('has-properties');

// transform functions which modify the original string into relevant string
const transforms = {
  'Is': require('../transforms/Is.js'),
  'StaticGet': require('../transforms/StaticGet.js'),
  'Remove': require('../transforms/Remove.js'),
  'HandleEvents': require('../transforms/HandleEvents.js'),
  'GetSet': require('../transforms/GetSet.js'),
  'Replace': require('../transforms/Replace.js')
}

const PluginError = gUtil.PluginError;

let map;

// consts
const PLUGIN_NAME = 'gulp-js-replacemap';

module.exports = function(options) {
  // through2.obj(fn) is a convinient wrapper around through2({ objectMode: true }, fn)
  // through2 --> stream funcs made consistent *magic*
  return through.obj(function(file, encoding, callback) {

    // if file is empty, just do nothing
    if (file.isNull()) {
      return callback(null, file);
    }

    // if all options are not present
    // TODO do some advanced error checks
    if (!hasProperties(options, ['map', 'before', 'after'])) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Options are required!'));
      return callback();
    } else {
      // load mapper to be used later on
      map = require(options.map);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming is not yet supported!'));
      return callback();
    }

    if (file.isBuffer()) {
      let filecontents = file.contents.toString(encoding),
        replaced = '',
        current,
        //  remnesance of good ol' c pointer days
        pointer = getIndexOf(filecontents, options.before),
        stringSuperman;

      // if pointer is -1 then exit straight away with the file as is
      if (pointer === -1) {
        return callback(null, file);
      }

      // put the contents before the first match into the replaced

      // go on until the last before match
      while (1) {
        pointer = getIndexOf(filecontents, options.before);

        // exit loop only if invalid pointer
        if (pointer === -1) {
          break;
        }

        current = filecontents.substr(0, pointer);
        replaced = replaced.concat(current);
        stringSuperman = getStringWithLength(filecontents, options.before);

        replaced = replaced.concat(stringSuperman.textValue);
        pointer += stringSuperman.textLength;

        // cut them matched text loose
        filecontents = filecontents.substr(pointer);

        // now look for after
        pointer = getIndexOf(filecontents, options.after);

        // if after is not found throw a error and exit
        if (pointer === -1) {
          this.emit('error', new PluginError(PLUGIN_NAME, 'After is not found'));
          return callback();
        }

        // use the after match's position to get the tokenized and replaced string
        current = filecontents.substr(0, pointer);
        // cut off the match part from the original source
        filecontents = filecontents.substr(pointer);
        current = replaceTextWithMap(current, map);
        replaced = replaced.concat(current);

        // now attach the after text
        stringSuperman = getStringWithLength(filecontents, options.after);
        replaced = replaced.concat(stringSuperman.textValue);
        pointer = stringSuperman.textLength;
        // console.log(pointer);

        // cut the matched text loose
        filecontents = filecontents.substr(pointer);
      }

      // write off the last chunk which is left
      replaced = replaced.concat(filecontents);
      // write data back to the file
      file.contents = Buffer.from(replaced, encoding);

      return callback(null, file);
    }
  });

  // get index of using regex or normal way -1 other wise
  function getIndexOf(string, find) {
    // if regex then do it regex way
    if (XRegExp.isRegExp(find)) {
      return string.search(find);
    } else {
      // normal way
      return string.indexOf(find);
    }
  }

  // get the full matched regex string or the string itself along with it's length
  function getStringWithLength(string, find) {
    let obj,
      match;
    // if regex then do it regex way
    if (XRegExp.isRegExp(find)) {
      match = XRegExp.match(string, find, 'one');
      obj = {
        textValue: match,
        textLength: match.length
      };
    } else {
      obj = {
        textValue: find,
        textLength: find.length
      };
    }
    return obj;
  }

  // replace until all of the map has are exhausted
  function replaceTextWithMap(string, map) {
    for (let item of map) {
      // do the transform according to the type
      string = transforms[item.type](string, item);
    }

    return string;
  }
};
