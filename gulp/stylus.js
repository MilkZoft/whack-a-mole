var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');

module.exports = function() {
    gulp.task('stylus', function() {
        gulp.src('./src/stylus/style.styl')
            .pipe(stylus({
                force: true,
                compress: true,
                use: nib()
            }))
            .pipe(gulp.dest('./src/public/css/'));
    });
};
