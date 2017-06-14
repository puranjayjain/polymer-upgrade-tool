const gulp = require('gulp');

// detect if it is a behavior or an element



gulp.task('default', function() {
  return gulp.src('test/paper-input-autocomplete.html')
  .pipe(gulp.dest('temp'));
});

gulp.start('default');
