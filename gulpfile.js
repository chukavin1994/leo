const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

const cssFils = [
    './assets/scss/style.scss'

]
const scriptsFiles = [
    './assets/js/main.js'
]

//таск на стили CSS
function styles() {
return gulp.src(cssFils)

.pipe(sass())
//объединение в один файл
.pipe(concat('style.css'))
.pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
}))
//минификация CSS
.pipe(cleanCss({
    level: 2 
}))

//выходная папка для стилей
.pipe(gulp.dest('./assets/css'))
.pipe(browserSync.stream());
}

// таск на скрипты
function scripts(){
return gulp.src(scriptsFiles)
//минификация js
.pipe(uglify())

.pipe(gulp.dest('./assets/js'))
.pipe(browserSync.stream());
}
//Просмотр файлов
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //селдить за CSS
    gulp.watch('./assets/scss**/*.scss', styles)
    gulp.watch('./assets/js**/*.js', scripts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}
//таск вызывающий функцию
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('assets', gulp.series(styles,scripts));
gulp.task('dev', gulp.series('assets','watch'));