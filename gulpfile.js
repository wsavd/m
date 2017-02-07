var gulp = require('gulp'),
    stylus = require("gulp-stylus"),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');

gulp.task('default', ['watch','browser-sync']);

gulp.task("stylus", function() {
    return gulp.src('public/css/**/*.styl')//получ все файлы с расширением .style в public/css и дочерих директориях
        .pipe(stylus())
        .pipe(gulp.dest('public/css'))
});

//смотрим за изменениями в views
gulp.task('pug', function(){
  return gulp.src('views/*.pug')
    .pipe(gulp.dest('views'))
});

//метод gulp, следящий за изменениями по пути и запускающий задачу stylus, если изменения имели место быть
gulp.task('watch',function(){
  gulp.watch('public/css/**/*.styl', ['stylus']);
  gulp.watch('views/*.pug', ['pug']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:8000",
        files: ["public/**/*.*", "views/*.*"],
        port: 3000
	});
});
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
