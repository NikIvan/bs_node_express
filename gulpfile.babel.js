'use strict';

import gulp from 'gulp';
import clean from 'gulp-clean';

// css
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css'; 

// html
import pug from 'gulp-pug';
import htmlmin from 'gulp-htmlmin';

// js
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import watchify from 'watchify'
import babelify from 'babelify';
import sourceStream from 'vinyl-source-stream'
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';

const dirs = {
  src: 'client',
  dest: 'public'
};

const stylPaths = {
  src: `${dirs.src}/styl`,
  dest: `${dirs.dest}/css`
};

const jsPaths = {
  src: `${dirs.src}/js`,
  dest: `${dirs.dest}/js`
};

const pugPaths = {
  src: `${dirs.src}/pug`,
  dest: `${dirs.dest}`
};

// ===== css =====
gulp.task('styles', () => {
  return gulp.src([`${stylPaths.src}/**/*.styl`, `!${stylPaths.src}/**/_*.styl`])
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest(stylPaths.dest));
});

gulp.task('styles:minify', () => {
  return gulp.src(`${stylPaths.dest}/**/*.css`)
    .pipe(clean())
    .pipe(cleanCss())
    .pipe(gulp.dest(stylPaths.dest));
})

// ===== html =====
gulp.task('templates', () => {
  return gulp.src([`${pugPaths.src}/**/*.pug`, `!${pugPaths.src}/layouts/*.pug`])
    .pipe(pug())
    .pipe(gulp.dest(pugPaths.dest));
});

gulp.task('templates:minify', () => {
  return gulp.src(`${pugPaths.dest}/**/*.html`)
    .pipe(clean())
    .pipe(htmlmin())
    .pipe(gulp.dest(pugPaths.dest));
});

// ===== js =====

let bundle = (handler, output) => {
  return () => {
    return handler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify error'))
        .pipe(sourceStream(output))
        .pipe(buffer())
        .pipe(gulp.dest(`${jsPaths.dest}`));
  };
};

let getJsHandler = (opts) => {
  return watchify(browserify(opts).transform(babelify, {
    presets: ["es2015"]
  }));
}

let ajaxTask =  {
  name: 'ajax',
  opts: {
    entries: [
      `${jsPaths.src}/ajax.js`
    ],
    debug: true
  }
};

let websocketsTask = {
  name: 'websockets',
  opts: {
    entries: [
      `${jsPaths.src}/websockets.js`
    ],
    debug: true
  }
};

let jsTasks = [ajaxTask, websocketsTask];

jsTasks.forEach((el) => {
  let dist = getJsHandler(el.opts);
  let distTask = `js:dist:${el.name}`;
  
  let build = getJsHandler(el.opts);
  let buildTask = `js:build:${el.name}`;
  
  build.on('update', () => {
    gulp.run([buildTask]);
  });
  
  build.on('log', gutil.log);

  gulp.task(buildTask, bundle(build, `${el.name}.js`));
  gulp.task(distTask, bundle(dist, `${el.name}.js`));
});

gulp.task('js:minify', () => {
  return gulp.src(`${jsPaths.dest}/**/*.js`)
    .pipe(clean())
    .pipe(uglify())
    .pipe(gulp.dest(jsPaths.dest));
});

gulp.task('js:build', ['js:build:ajax', 'js:build:websockets']);
gulp.task('js:dist', ['js:dist:ajax', 'js:dist:websockets']);

// ===== common =====
gulp.task('watch', () => {
  gulp.watch([`${stylPaths.src}/**/*.styl`], ['styles']);
  gulp.watch([`${pugPaths.src}/**/*.pug`], ['templates']);
  gulp.watch([`${jsPaths.src}/**/*.js`], ['js:build']);
});

gulp.task('default', [
  'styles', 
  'templates', 
  'js:build',
  'watch'
]);

gulp.task('dist', [
  'styles',
  'styles:minify', 
  'templates', 
  'templates:minify', 
  'js:dist',
  'js:minify'
]);