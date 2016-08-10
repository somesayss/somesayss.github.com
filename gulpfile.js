// 定义
const 
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    webpack = require('webpack-stream'),
    named = require('vinyl-named');
 
// 任务
gulp.task('default', ['watch', 'brow']);

// 观察者
var matchRex = /(src.*)\/.*\.*/;
gulp.task('watch', () => {
    gulp.watch(['src/**/*.babel', 'src/**/*.jsx'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            // console.log('File ' + file + ' was ' + e.type);
            gulp.src( file )
                .pipe( babel( { presets: ['es2015', 'react', 'stage-0'] } ).on('error', (e) => {
                    console.error('error', e.message);
                }) )
                .pipe(gulp.dest( match[1] ));
        });
});

// 全量打包

gulp.task('webpack', () => {
    return gulp.src(['src/js/bus/limit/main.js'])
        .pipe(named())
        .pipe(webpack( require('./webpack.config') ))
        .pipe(gulp.dest('dist/js/bus/limit'));
})


// 静态服务
gulp.task('brow', () => {
    browserSync({
        // files: ['src/css/**/*.css', 'src/js/**/*.js', 'src/html/**/*.html'],
        files: ['src/css/**/*.css', 'dist/js/**/*.js', 'src/html/**/*.html'],
        server: {
            baseDir: "./"
        }
    });
});