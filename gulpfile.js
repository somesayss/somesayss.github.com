// 定义
const fs = require('fs');
const gulp = require('gulp');
const glob = require('glob');
const less = require('gulp-less');
const uglify= require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const staticConfig = require('./config/staticConfig')
 
// 任务
const env = gulp.env;
const isBuild = env.build;

// 默认打包，压缩
gulp.task('default', ['buildEntry', 'zip']);

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
        .pipe( gulp.dest('dist/css') );
    // 编译less
    let lessList = isBuild ? ['src/css/**/*.less', 'src/js/**/style.less'] : ['src/css/**/*.less'];
    gulp.src(lessList)
        .pipe( concat('app.css') )
        .pipe( less() )
        .pipe( cssmin() )
        .pipe( gulp.dest('dist/css') );
    // 静态文件
    staticConfig.staticList.forEach((val) => {
        gulp.src([`src/${val}/**/*`])
            .pipe( gulp.dest(`dist/${val}`) )
    });
});

gulp.task('buildEntry', () => {
    let buildPool = [];
    glob.sync('src/js/bus/**/index.js').forEach((files) => {
        buildPool.push(`${files.match(/bus\/(.*)\/index/)[1]}`);
    });
    glob.sync('src/js/entry/**/view.js').forEach((path) => {
        fs.readFile(path, (err, file) => {
            if( !err ){
                let str = file.toString().replace(/linksList[\s\S]*buildLinksListEnd/, `linksList: [\n${buildPool.map((val) => `'${val}'`).join(',\n')}\n],\n//buildLinksListEnd`);
                buildPool = buildPool.map((val) => {
                    return `'${val}': function(){
                        require.ensure([], (a) => {
                            let reactCom = require('bus/${val}/index')['default'];
                            Actions(me).changeCom(reactCom);
                        }, 'bus/${val}/index');
                    }`;
                });
                str = str.replace(/rule[\s\S]*buildRuleEnd/, `rule: {\n${buildPool.join(',\n')}\n}\n//buildRuleEnd`);
                fs.writeFile(path, str);
                 console.log('buildEntry success');
            }else{
                throw err;
            };
        });
    });
});

























