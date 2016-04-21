var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var gcmq = require('gulp-group-css-media-queries');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-nano');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var reload = browserSync.reload;

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

/*
  'browser-sync'
*/

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'wp.dev',
    open: true,
    notify: false
  });
});


/*
  'styles'
*/

gulp.task('styles', function () {
  gulp.src('./library/scss/**/**/**/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(minifyCSS({keepSpecialComments: '0'}))
    .pipe(gulp.dest('./library/css/'))
    .pipe(reload({stream:true}));
});


/*
  'watch'
*/

gulp.task('default', ['styles', 'browser-sync'], function() {
  gulp.watch('./library/scss/**/**/**/**/*', ['styles']);
});

