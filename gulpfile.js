import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import bs from 'browser-sync';
import del from 'del';
import pug from 'gulp-pug';
import purgecss from 'gulp-purgecss';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import svgSprite from 'gulp-svg-sprite';

const {
  src, dest, series, parallel, watch,
} = gulp;
const sass = gulpSass(dartSass);
const browserSync = bs.create();

const isProduction = process.env.NODE_ENV === 'production';

const clean = () => del(['build']);

const buildStyles = () => src('app/scss/app.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulpif(isProduction, purgecss({
    content: ['app/pug/**/*.pug'],
    variables: true,
  })))
  .pipe(dest('build/css'))
  .pipe(browserSync.stream());

const buildHtml = () => src('app/pug/*.pug')
  .pipe(pug())
  .pipe(dest('build'))
  .pipe(browserSync.stream());

const buildImages = () => src('app/assets/images/*')
  .pipe(changed('build/images'))
  .pipe(dest('build/images'));

const buildSprite = () => src('app/assets/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../sprite.svg',
      },
    },
  }))
  .pipe(dest('build/images'));

const build = series(clean, parallel(
  buildStyles, buildHtml, buildImages, buildSprite,
));

const runServer = () => {
  browserSync.init({
    server: "build/",
    open: false,
  });

  watch('app/scss/**/*.scss', buildStyles);
  watch('app/pug/**/*.pug', buildHtml);
  watch('app/assets/icons/*.svg', buildSprite);
};

export const develop = series(build, runServer);
export default build;
