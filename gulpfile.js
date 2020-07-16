'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sassLint = require('gulp-sass-lint');
const jsYaml = require('js-yaml');
const fs = require('fs');

sass.compiler = require('node-sass');

function styleLint() {
  const configFile = jsYaml.safeLoad(fs.readFileSync('.sass-lint.yml', 'utf-8'));
  return gulp
    .src('scss/**/*.s+(a|c)ss')
    .pipe(sassLint(configFile))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
}

function styleLintNoErrors() {
  const configFile = jsYaml.safeLoad(fs.readFileSync('.sass-lint.yml', 'utf-8'));
  return gulp
    .src('scss/**/*.s+(a|c)ss')
    .pipe(sassLint(configFile))
    .pipe(sassLint.format())
}

function css() {
  return gulp
    .src('./scss/main.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css/'))
}

function watchFiles() {
  gulp.watch('./scss/**/*', styleLint);
  gulp.watch('./scss/**/*', css);
}

const lint = gulp.series(styleLint);
const build = gulp.series(gulp.parallel(styleLint, css));
const watch = gulp.series(gulp.parallel(styleLintNoErrors, watchFiles));

exports.lint = lint;
exports.watch = watch;
exports.default = build;
