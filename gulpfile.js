import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import bs from 'browser-sync';
import del from 'del';
import pug from 'gulp-pug';

const {
  src, dest, series, parallel, watch,
} = gulp;
const sass = gulpSass(dartSass);
const browserSync = bs.create();

const clean = () => del(['build']);

const buildStyles = () => src('app/scss/app.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(dest('build/css'))
  .pipe(browserSync.stream());

const buildHtml = () => src('app/pug/*.pug')
  .pipe(pug())
  .pipe(dest('build'))
  .pipe(browserSync.stream());

const build = series(clean, parallel(buildStyles, buildHtml));

const runServer = () => {
  browserSync.init({
    server: "build/",
    open: false,
  });

  watch('app/scss/**/*.scss', buildStyles);
  watch('app/pug/**/*.pug', buildHtml);
};

export const develop = series(build, runServer);
export default build;
