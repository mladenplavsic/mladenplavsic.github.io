var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var inlinesource = require('gulp-inline-source');
var imagemin = require('gulp-imagemin');
var base64 = require('gulp-base64');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

var paths = {};

paths.less = [
    './src/less/*.less'
];

gulp.task('build:less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(cssnano())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./src/less/'));
});

paths.html = './src/index.html';

gulp.task('default', ['build']);

gulp.task('build', [
    'build:less'
], function () {
    return gulp.src(paths.html)
        .pipe(inlinesource())
        .pipe(base64())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
    return runSequence(
        'build',
        [
             'watch:less'
            , 'watch:html'
        ]
    )
});

gulp.task('watch:less', function () {
    gulp.watch(paths.less, ['build:less']);
});

gulp.task('watch:html', function () {
    gulp.watch(paths.html, ['build']);
});
