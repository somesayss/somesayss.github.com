// 依赖
const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// 任务
gulp.task('default', ['zip']);
gulp.task('server', ['brow', 'watch']);

// 静态服务
gulp.task('brow', () => {
    return browserSync({
        files: ['dist/**/*.css', 'test/**/*.html'],
        server: {
            baseDir: "./"
        }
    });
});

// less编译
gulp.task('less', () => {
	return gulp.src(['src/**/*.less'])
		.pipe( less() )
		.pipe( gulp.dest('dist') );
});

// less压缩
gulp.task('zip', ['less'], () => {
    return gulp.src(['dist/**/*.css', '!dist/**/*.min.css'])
        .pipe( cssmin() )
        .pipe( rename({suffix: '.min'}) )
        .pipe( gulp.dest('dist') );
});

// 自动编译
gulp.task('watch', () => {
    const matchRex = /src((?:\/.*\/)?).*\..*/;
    gulp.watch(['src/**/*.less'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            // console.log('File ' + file + ' was ' + e.type);
            gulp.src( file )
                .pipe( less() )
                .pipe( gulp.dest('dist' + match[1]) );
        });
});