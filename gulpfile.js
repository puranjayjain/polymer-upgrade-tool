const gulp = require('gulp');
const replaceMap = require('./gulp-replacemap.js');

gulp.task('default', () => {
  return gulp.src('test/paper-input-autocomplete-chips.html')
  // replace in js in the Polymer({ inside the definition })
    .pipe(replaceMap({before: /Polymer\({/ig, after: /<\/script>/igm, map: './map.js'}))
    .pipe(gulp.dest('output'))
});