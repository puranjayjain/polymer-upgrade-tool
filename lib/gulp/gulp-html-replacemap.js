'use strict';

const through = require('through2');
const gUtil = require('gulp-util');
const XRegExp = require('xregexp');
const hasProperties = require('has-properties');

// transform functions which modify the original string into relevant string
const transforms = {
  'Replace': require('../transforms/Replace.js')
}

const PluginError = gUtil.PluginError;

let map;

// consts
const PLUGIN_NAME = 'gulp-html-replacemap';

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
    if (!hasProperties(options, ['map'])) {
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
      let filecontents = file.contents.toString(encoding);

      filecontents = replaceTextWithMap(filecontents, map);

      // write data back to the file
      file.contents = Buffer.from(current, encoding);

      return callback(null, file);
    }
  });

  // replace until all of the map has are exhausted
  function replaceTextWithMap(string, map) {
    for (let item of map) {
      // do the transform according to the type
      string = transforms[item.type](string, item);
    }

    return string;
  }
};
