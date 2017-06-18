const gulp = require('gulp');
const scan = require('gulp-scan');
const chalk = require('chalk');

const replaceMap = require('./lib/gulp/gulp-replacemap.js');

// file config or otherwise
const terminal = {
  info: chalk.blue,
  error: chalk.bold.red
};

const replaceMapOption = '../gulp/map.js';
const src = 'test/paper-input-autocomplete-chips.html';
// const src = 'test/input-autocomplete-behavior.html';
const dest = 'output';

// detect if it is a behavior or an element
const detectFileType = () => {
  return new Promise((resolve, reject) => {
    let isElement = false;

    // check for file type
    gulp.src(src).pipe(scan({
      term: '<dom-module',
      // do something with {String} `match`
      // `file` is a clone of the vinyl file.
      fn: (match, file) => {
        isElement = true;
      }
    })).pipe(gulp.dest(dest)).on('end', () => resolve(isElement)).on('error', () => reject(isElement));
  });
}

// replacement for an element
const replaceElement = () => {
  return new Promise((resolve, reject) => {
    gulp.src(src)
    // replace in js in the Polymer({ inside the definition })
      .pipe(replaceMap({before: /Polymer\({/ig, after: /<\/script>/igm, map: replaceMapOption}))
      .pipe(gulp.dest(dest))
      .on('end', () => resolve(1))
      .on('error', () => reject(0));
  });
}

// helper methods
const consoleError = (text) => {
  console.log(terminal.error(text));
}

// main task
async function main() {
  let isElement = false;
  
  try {
    isElement = await detectFileType();
  } catch (err) {
    consoleError('Error : File could not be found');
  } finally {
    if (isElement) {
      isElement = await replaceElement();
    } else {}
  }
}

main();