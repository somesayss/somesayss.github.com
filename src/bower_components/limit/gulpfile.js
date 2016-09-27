// 依赖
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify= require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// 任务
gulp.task('default', ['zip']);
gulp.task('server', ['brow', 'watch']);

// 静态服务
gulp.task('brow', () => {
    return browserSync({
        files: ['dist/**/*.js', 'test/**/*.html'],
        server: {
            baseDir: "./"
        }
    });
});

// babel编译
gulp.task('babel', () => {
	return gulp.src(['src/**/*.js'])
		.pipe(babel({presets: ['es2015', 'stage-0']}).on('error', (e) => {
            console.log(e.message);
        }))
		.pipe(gulp.dest('dist'));
});

// 压缩
gulp.task('zip', ['babel'], () => {
    return gulp.src(['dist/**/*.js', '!dist/**/*.min.js'])
        .pipe( uglify() )
        .pipe( rename({suffix: '.min'}) )
        .pipe(gulp.dest('dist'));
});

// 自动编译
gulp.task('watch', () => {
    const matchRex = /src((?:\/.*\/)?).*\..*/;
    gulp.watch(['src/**/*.js'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            // console.log('File ' + file + ' was ' + e.type);
            gulp.src( file )
                .pipe( babel( { presets: ['es2015', 'stage-0'] } ).on('error', (e) => {
                    console.error('error', e.message);
                }) )
                .pipe(gulp.dest('dist' + match[1]));
        });
});