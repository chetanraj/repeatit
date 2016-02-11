var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    gulp.src(['common.js', 'recipes/*Recipe.js', 'child_recipes/*Recipe.js', 'recorder.js'])
        .pipe(concat('inject.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watchjs', function () {
    gulp.watch(['**/*.js', '!inject.js', '!options/*.js'], ['scripts']);
});
