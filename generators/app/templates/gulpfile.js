'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')({
    pattern: '*',
    rename: {
        'browserify': 'browserify',
        'vinyl-buffer': 'buffer',
        'babelify': 'babelify',
        'vinyl-source-stream': 'source'
      }
    }
);

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('html', function () {
  gulp.src('./src/*.html')
    .pipe($.connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(['./src/js/**/*.js', '!./src/js/!bundle.js', '!./src/js/!bundle.js.map'])
    .pipe($.eslint({}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('build', function() {
  return $.browserify('./src/js/app.js')<% if (useEcmascript) { %>
    .transform("babelify") <% } %>
    .bundle()
    .on('error', swallowError)
    .pipe($.source('bundle.js'))
    .pipe($.buffer())
    .pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe($.sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./src/js/'))
    .pipe($.connect.reload());
});

gulp.task('build-dev', function() {
  return $.browserify('./src/js/app.js')<% if (useEcmascript) { %>
    .transform("babelify") <% } %>
    .bundle()
    .pipe($.source('bundle.min.js'))
    .pipe($.buffer())
    .pipe($.uglify({ mangle: false}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.start('build');
  gulp.watch(['./src/js/**/*.js', '!./src/js/bundle.js'], ['build']);
  gulp.watch('./src/*.html', ['html']);
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