'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });  
})

gulp.task('pug', function () {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(gp.pug({pretty: true}))
    .pipe(gulp.dest('build'))
    .on('end',browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('src/static/sass/*.scss')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.sass().on('error', gp.sass.logError))
    .pipe(gp.autoprefixer({ cascade: false }))
    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('copyfonts', function() {
  return gulp.src('src/static/fonts/**/*.{ttf,woff,eot,svg,otf}')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('copyjs', function() {
  return gulp.src('src/static/js/**/*.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('copyimages', function() {
  return gulp.src('src/static/img/**/*.{jpg,png,svg}')
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
    gulp.watch('src/pug/**/*.pug',gulp.series('pug'));
    gulp.watch('src/static/sass/**/*.scss',gulp.series('sass'));
    gulp.watch('src/static/js/**/*.js',gulp.series('copyjs'));
})

gulp.task('default', gulp.series(
  gulp.parallel('pug','sass','copyfonts','copyjs','copyimages'),
  gulp.parallel('watch','serve')
));