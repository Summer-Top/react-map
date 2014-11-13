var gulp = require('gulp'),
    config = require('./build-config.js'),
    browserSync = require("browser-sync"),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    requirejs = require('requirejs'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    glob = require('glob'),
    del = require('del');

gulp.task('copy-libs', function () {
  return gulp.src(config.copy.libs.src)
    .pipe(gulp.dest(config.copy.libs.dest));
});

gulp.task('copy-access', function () {
  return gulp.src(config.copy.access.src)
    .pipe(gulp.dest(config.copy.access.dest));
});

gulp.task('minify-html', function () {
  return gulp.src(config.htmlmin.src)
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(config.htmlmin.dest));
});

gulp.task('minify-js', function () {
  return gulp.src(config.uglify.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.uglify.dest));
});

gulp.task('minify-images', function () {
  return gulp.src(config.imagemin.src)
    .pipe(imagemin({
       progressive: true,
       svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(config.imagemin.dest));
});

gulp.task('stylus-dev', function () {
  return gulp.src(config.stylus.src)
    .pipe(stylus({compress: false, linenos: true }))
    .pipe(gulp.dest(config.stylus.devOut));
});

gulp.task('stylus-build', function () {
  return gulp.src(config.stylus.src)
    .pipe(stylus({compress: true, linenos: false }))
    .pipe(gulp.dest(config.stylus.dest));
});

gulp.task('delete', function () {
  del(config.del, function(){});
});

gulp.task('browser', function () {
  browserSync(config.browserSync);
});

gulp.task('optimize', function () {
  requirejs.optimize(config.requirejs.options, function (res) {});
});

gulp.task('stylus-watch', function () {
  gulp.watch(config.stylus.watch, ['stylus-dev']);
});

gulp.task('copy', ['copy-libs', 'copy-access']);
gulp.task('minify', ['minify-html', 'minify-js', 'minify-images']);

gulp.task('watch', ['stylus-watch']);
gulp.task('watch-browser', ['stylus-watch', 'browser']);
gulp.task('build', ['delete', 'copy', 'minify', 'stylus-build', 'optimize']);

