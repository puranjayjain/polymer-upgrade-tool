'use strict';

const gulp = require('gulp');
const scan = require('gulp-scan');
const chalk = require('chalk');
// const replaceMap = require('gulp-replace-frommap');
const replaceMap = require('./gulp-replacemap.js');

// file config or otherwise
const terminal = {
  info: chalk.blue,
  error: chalk.bold.red
};

const src = 'test/paper-input-autocomplete.html';
// const src = 'test/input-autocomplete-behavior.html';
const dest = 'temp';

// detect if it is a behavior or an element
const detectFileType = new Promise((resolve, reject) => {
  let isElement = false;

  // check for file type
  gulp.src(src).pipe(scan({
    term: '<dom-module',
    // do something with {String} `match`
    // `file` is a clone of the vinyl file.
    fn: (match, file) => {
      isElement = true;
    }
  })).pipe(gulp.dest(dest)).on('end', () => {
    resolve(isElement);
  }).on('error', () => {
    reject(isElement)
  });
});

// replacement for an element
const replaceElement = new Promise((resolve, reject) => {
  let isElement = false;

  gulp.src(src)
  // replace in js in the Polymer({ inside the definition })
    .pipe(replaceMap({before: /Polymer\({/igm, after: /<\/script>/igm, map: './map.js'}))
    .pipe(gulp.dest(dest))
    .on('end', () => {
      resolve(isElement);
    })
    .on('error', () => {
      reject(isElement);
    });
});

// helper methods
const consoleError = (text) => {
  console.log(terminal.error(text));
}

// main task
async function main() {
  let isElement = false;
  try {
    isElement = await detectFileType;
  } catch (err) {
    consoleError('Error : File could not be found');
  } finally {
    if (isElement) {
      await replaceElement;
    } else {}
  }
}

main();