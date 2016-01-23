var gulp = require('gulp');
var stylus = require('gulp-stylus');

module.exports = function() {
    gulp.task('stylus', function() {
        gulp.src('./src/stylus/style.styl')
            .pipe(stylus())
            .pipe(gulp.dest('./src/public/css/'));
    });
};
