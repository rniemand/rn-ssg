const { series, src, dest, watch, parallel } = require("gulp");
const inlinesource = require("gulp-inline-source");
const path = require("path");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const clean = require("gulp-clean");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');

const watchPaths = [
  "./src/scripts/**/*.js",
  "./src/*.js",
  "./src/scripts/**/*.jsx",
  "./src/**/*.html",
  "./src/**/*.css",
  "./src/**/*.less",
];

function generateJs() {
  return src([
    "./src/app.config.js",
    "./src/app.core.js",
    "./src/scripts/**/*.js",
    "./src/scripts/**/*.jsx",
    "./src/app.bootstrap.js",
  ])
    .pipe(sourcemaps.init())
    .pipe(concat("ui.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
        plugins: ["transform-react-jsx"],
        sourceType: "module",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest("./dist"));
}

function processLess() {
  return src("./src/styles/**/*.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")],
      })
    )
    .pipe(concat("less.css"))
    .pipe(dest("./dist"));
}

function generateCss() {
  return src(["./src/styles/**/*.css", "./dist/less.css"])
    .pipe(concat("ui.css"))
    .pipe(dest("./dist"));
}

function generateHtml() {
  return src("./src/*.html")
    .pipe(inlinesource({ compress: true }))
    .pipe(dest("./dist"));
}

function cleanup() {
  return src(["./dist/ui.js", "./dist/ui.css", "./dist/less.css"]).pipe(
    clean()
  );
}

const buildProcess = series(
  processLess,
  parallel(generateJs, generateCss),
  generateHtml,
  cleanup,
);

function doWatch() {
  return watch(watchPaths, { ignoreInitial: false }, buildProcess);
}

exports.default = buildProcess;
exports.watch = doWatch;