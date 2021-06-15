'use strict';

const pkg = require('./package.json');
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");

const { dest, series, src, task, watch } = require('gulp');

// Load all plugins in devDependencies.
const $ = require('gulp-load-plugins')({
  pattern: ['*'],
  scope: ['devDependencies'],
  rename: {
    'gulp-postcss': 'postcss',
    'gulp-sass-glob': 'glob',
    'gulp-sass-lint': 'sasslint',
    'gulp-shell': 'shell',
    postcss: 'postcss-lib',
  },
});
$.sass.compiler = require('node-sass');

// Logs error messages.
const onError = (err) => {
  console.log(err);
};

// Clean CSS and style guide files.
task('clean', () => {
  return $.del(['./css/*', './styleguide/*']);
});

// Compile Sass files.
task('scss', () => {
  return $.pipe(src(pkg.paths.scss), [
    $.plumber({ errorHandler: onError }),
    $.glob(),
    $.sourcemaps.init({ loadMaps: true }),
    $.sass({
      includePaths: pkg.paths.scss,
    }).on('error', $.sass.logError),
    $.cached('sass_compile'),
    $.postcss([$.autoprefixer()]),
    $.sourcemaps.write('./'),
    dest(pkg.paths.dist.css),
  ]);
});

// Lint Sass files.
task('scss-lint', () => {
  return $.pipe(src(pkg.paths.scss), [
    $.plumber({ errorHandler: onError }),
    $.glob(),
    $.sasslint({
      options: {
        formatter: 'table',
      },
    }),
    $.sasslint.format(),
  ]);
});

// Generate living style guide.
task('styleguide', $.shell.task(['./node_modules/kss/bin/kss --config ./kss-config.json']));

// Build CSS files.
task(
  'css',
  series('scss', () => {
    return $.pipe(src(pkg.paths.dist.css + '**/*.css'), [
      $.plumber({ errorHandler: onError }),
      $.sourcemaps.init({ loadMaps: true }),
      $.postcss([$.cssnano({ preset: 'default' })]),
      $.rename({ suffix: '.min' }),
      $.sourcemaps.write('./'),
      dest(pkg.paths.dist.css),
    ]);
  })
);

// Lint JavaScript files.
task('js-lint', () => {
  return $.pipe(src(pkg.paths.js), [$.plumber({ errorHandler: onError }), $.eslint(), $.eslint.format('table')]);
});

// Build JS files.
task("js", () => {
  return $.pipe(src(pkg.paths.js), [
    $.sourcemaps.init({ largeFile: true }),
    uglify(),
    $.sourcemaps.write(),
    dest(pkg.paths.dist.js)
  ]);
});

// Minify image assets.
task('image-min', () => {
  return $.pipe(src(pkg.paths.dist.img + '**/*.{png,jpg,jpeg,gif,svg}'), [
    $.imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 7,
      svgoPlugins: [{ removeViewBox: false }],
      verbose: true,
      use: [],
    }),
    dest(pkg.paths.dist.img),
  ]);
});

// Default build task.
task('default', series(['clean', 'css']));

// Watch task.
task(
  'watch',
  series(['clean', 'css', 'js-lint'], () => {
    watch(pkg.paths.scss, series(['css']));
    watch(pkg.paths.js, series(['js-lint']));
  })
);
// Lint task.
task('lint', series(['js-lint', 'scss-lint']));
