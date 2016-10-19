'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
        'run-sequence': 'runSequence',
        'browserSync': 'browser-sync',
        'browserify': 'browserify',
        'vinyl-buffer': 'buffer',
        'babelify': 'babelify',
        'vinyl-source-stream': 'source'
      }
    }
);

gulp.task('build', function() {
  return $.browserify('./src/js/app.js')
    .bundle()
    .pipe($.source('bundle.js'))
    .pipe($.buffer())
    .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe($.sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./src/js/'))
    .pipe($.connect.reload());
});

gulp.task('build-dev', function() {
  return $.browserify('./src/js/app.js')
    .bundle()
    .pipe($.source('bundle.min.js'))
    .pipe($.buffer())
    .pipe($.uglify({ mangle: false}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.start('build');
  gulp.watch('./src/js/**/*.js', ['build']);
  gulp.watch([
    'src/*.html'
  ]).on('change', $.browserSync.reload);
});

gulp.task('serve', function(event) {
  $.connect.server({
    baseDir: "./src",
    root: '.',
    port: 3000,
    livereload: true
  });
  gulp.start('watch');
});

gulp.task('default', ['serve']);