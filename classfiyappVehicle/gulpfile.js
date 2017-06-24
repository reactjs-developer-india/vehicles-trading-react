var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat')
//sass
gulp.task('sass', function () {
    gulp.src(['styleSheets/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('app.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/'))
});

// Default task
gulp.task('default', function () {
    gulp.watch(['styleSheets/*.scss', 'styleSheets/partials/*.scss', 'styleSheets/partials/*/*.scss'], ['sass']);
});
