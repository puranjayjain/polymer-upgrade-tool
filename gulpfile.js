'use strict';

const gulp = require('gulp');
const scan = require('gulp-scan');

// file config or otherwise
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
  }))
  .pipe(gulp.dest(dest))
  .on('end', () => {
    resolve(isElement);
  })
  .on('error', () => {
    reject(isElement)
  });
});

// main task
async function main() {
  let isElement = false;
  try {
    isElement = await detectFileType;
  } catch (err) {
    console.log('fetch failed', err);
  }
  finally {
    console.log(isElement);
  }
}

main();