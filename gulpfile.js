var gulp = require('gulp'),
connect = require('gulp-connect'),
open = require("gulp-open"),
browserify = require('gulp-browserify'),
concat = require('gulp-concat'),
port = process.env.port || 3031;

gulp.task('browserify', function() {
  gulp.src('./public/src/js/main.js')
  .pipe(browserify({ transform: 'reactify' }))
  .pipe(gulp.dest('./public/dist/js'));
});

// launch browser in a port
gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port,
  };
  gulp.src('./public/index.html')
  .pipe(open('', options));
});

// live reload server
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function () {
  gulp.src('./public/dist/**/*.js')
  .pipe(connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./public/*.html')
  .pipe(connect.reload());
});

// watch files for live reload
gulp.task('watch', function() {
  gulp.watch('public/dist/js/*.js', ['js']);
  gulp.watch('public/index.html', ['html']);
  gulp.watch('public/src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);
