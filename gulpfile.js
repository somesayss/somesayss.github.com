// 定义
const gulp = require('gulp');
const less = require('gulp-less');
const named = require('vinyl-named');
const uglify= require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const webpackConfig = require('./webpack.config');
 
// 任务
// 默认打包，压缩
gulp.task('default', ['zip', 'webpackOnce']);
gulp.task('nomin', ['zip', 'webpackOnceNomin']);
gulp.task('server', ['zip', 'webpack', 'brow', 'watch']);

// 自定义打包
gulp.task('zip', () => {
    // common.js
    gulp.src(webpackConfig.commonJsList)
        .pipe( concat('common.js') )
        .pipe( uglify() )
        .pipe( gulp.dest('dist/js/libs') );
    // common.css
    gulp.src(webpackConfig.commonCssList)
        .pipe( concat('common.css') )
        .pipe(gulp.dest('dist/css') );
    // 编译less
    gulp.src(['src/css/**/*.less'])
        .pipe( less() )
        .pipe( cssmin() )
        .pipe( gulp.dest('dist/css') );
    // 静态文件
    webpackConfig.staticList.forEach((val) => {
        gulp.src([`src/${val}/**/*`])
            .pipe( gulp.dest(`dist/${val}`) )
    });
});

// webpack打包
const matchFileRex = /src\/(.*)\..*/;
function webpackCall(config){
    return gulp.src(['src/**/main.js'])
        .pipe( named( (file) => file.path.match(matchFileRex)[1] ) )
        .pipe( webpack(config).on( 'error', (e) => console.log(e) ) )
        .pipe( gulp.dest('dist') );
};
gulp.task( 'webpackOnceNomin', () => webpackCall( webpackConfig(false, false) ) );
gulp.task( 'webpackOnce', () => webpackCall( webpackConfig(false, true) ) );
gulp.task( 'webpack', () => webpackCall( webpackConfig(true, false) ) );

// 静态服务
const browConfig = {
    files: ['dist/css/**/*.css', 'dist/js/**/*.js', 'html/**/*.html'],
    server: {
        baseDir: "./"
    }
};
if(gulp.env && gulp.env.https){
    browConfig.https = true;
};
gulp.task( 'brow', () => browserSync(browConfig) );

// less自动编译
gulp.task('watch', () => {
    const matchRex = /src((?:\/.*\/)?).*\..*/;
    gulp.watch(['src/css/**/*.less'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            gulp.src( file )
                .pipe( less() )
                .pipe( cssmin() )
                .pipe( gulp.dest('dist' + match[1]) );
        });
});