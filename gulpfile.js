var gulp = require('gulp'),
    config = require('./build-config.js'),
    browserSync = require("browser-sync"),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    requirejs = require('requirejs'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    glob = require('glob'),
    del = require('del');


gulp.task('copy', function () {
  gulp.src(config.copy.access.src)
  .pipe(gulp.dest(config.copy.access.dest));

  gulp.src(config.copy.libs.src)
  .pipe(gulp.dest(config.copy.libs.dest));
});

gulp.task('minify', function () {
 // Minify Html
  gulp.src(config.htmlmin.src)
  .pipe(htmlmin({collapseWhitespace: true, removeComments: true }))
  .pipe(gulp.dest(config.htmlmin.dest));
  // Minify Js
  gulp.src(config.uglify.src)
  .pipe(uglify())
  .pipe(gulp.dest(config.uglify.dest));
  // Minify Images
  gulp.src(config.imagemin.src)
  .pipe(imagemin({
     progressive: true,
     svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest(config.imagemin.dest));

});

gulp.task('browser', function () {
  browserSync({   
    // server: {
    //   baseDir: "src"
    // },
    proxy: "localhost",
    files: [
      'src/app/**/*.css',
      'src/app/**/*.js'
    ]
  });
});

gulp.task('optimize', function () {
  requirejs.optimize(config.requirejs.options, function (res) {});
});

gulp.task('stylus-watch', function () {
  gulp.watch(config.stylus.src, ['stylus-dev']);
});

gulp.task('stylus-dev', function () {
  return gulp.src(config.stylus.src)
    .pipe(stylus({compress: false, linenos: true }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(config.stylus.devOut));
});

gulp.task('stylus-build', function () {
  return gulp.src(config.stylus.src)
    .pipe(stylus({compress: true, linenos: false }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(config.stylus.dest));
});

gulp.task('delete', function () {
  del(config.del, function(){});
});

gulp.task('watch', ['stylus-watch', 'browser']);
gulp.task('build', ['delete', 'copy', 'minify', 'stylus-build', 'optimize']);