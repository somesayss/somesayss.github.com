// 定义
const gulp = require('gulp');
const less = require('gulp-less');
const named = require('vinyl-named');
const uglify= require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const staticConfig = require('./config/staticConfig')
 
// 任务
// 默认打包，压缩
gulp.task('default', ['zip']);

// 自定义打包
gulp.task('zip', () => {
    // common.js
    gulp.src(staticConfig.commonJsList)
        .pipe( concat('common.js') )
        .pipe( uglify() )
        .pipe( gulp.dest('dist/js/libs') );
    // common.css
    gulp.src(staticConfig.commonCssList)
        .pipe( concat('common.css') )
        .pipe(gulp.dest('dist/css') );
    // 编译less
    gulp.src(['src/css/**/*.less'])
        .pipe( less() )
        .pipe( cssmin() )
        .pipe( gulp.dest('dist/css') );
    // 静态文件
    staticConfig.staticList.forEach((val) => {
        gulp.src([`src/${val}/**/*`])
            .pipe( gulp.dest(`dist/${val}`) )
    });
});

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