// 定义
const 
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    webpack = require('webpack-stream'),
    named = require('vinyl-named'),
    paths = require('vinyl-paths');
 
// 任务
gulp.task('default', []);
gulp.task('server', ['webpack', 'brow']);

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
var matchRex = /src(.*)\/.*\.*/;
gulp.task('webpack', () => {
    return gulp.src(['src/**/main.js'])
        .pipe(paths((path) => {
            var matchPath = path.match(matchRex)[1];
            gulp.src(path)
                .pipe(named())
                .pipe(webpack( require('./webpack.config') ).on('error', e => {
                    console.error('error', e.message);
                }))
                .pipe(gulp.dest('dist'+matchPath));
            return Promise.resolve();
        }))
});


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