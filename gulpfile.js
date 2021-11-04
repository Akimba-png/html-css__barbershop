const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');

const styles = () => {
  return gulp.src('./source/css/**/*.css')
  .pipe(browserSync.stream());
};
exports.styles = styles;

const createSprite = () => {
  return gulp.src('./source/img/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg",
      }
    }
  }))
  .pipe(gulp.dest('./source/img/icons'))
}
exports.createSprite = createSprite;


const server = (done) => {
  browserSync.init({
    server: {
      baseDir: './source',
    },
  });
  done();
};

const watcher = () => {
  gulp.watch('./source/css/**/*css', styles)
  gulp.watch('./source/*.html').on('change', browserSync.reload);
};

exports.default = gulp.series(server, watcher);
