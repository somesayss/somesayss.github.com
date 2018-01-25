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
        .pipe( concat('app.js') )
        .pipe( uglify() )
        .pipe( gulp.dest('dist/js/libs') );
    // 编译less
    var lessList = isBuild ? ['src/css/**/*.less', 'src/js/**/style.less'] : ['src/css/**/*.less'];
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
    console.log('zip ok.');
});

gulp.task('lessAfter', () => {
     glob.sync('dist/css/**/*.css').forEach((files) => {
        // console.log(files)
        // fs.writeFile(files, str);
        var data = fs.readFileSync(files, 'utf-8');
        data = data.replace(/url(\(.*?\))/g, (a,b,c) => {
            console.log('需要转义的地址->', b);
            var key = b.replace(/((?:\.\.\/)+)/, '../');
            return 'url' + key;
        });
        console.log(files)
        fs.writeFile(files, data);
    });
     console.log('lessAfter ok.')
});

gulp.task('buildEntry', () => {
    var buildPool = [];
    glob.sync('src/js/bus/**/index.js').forEach((files) => {
        buildPool.push(`${files.match(/bus\/(.*)\/index/)[1]}`);
    });

    var linksListStr = buildPool.map((val) => `\t\t'${val}'`).join(',\n');

    var ruleStr = buildPool.map((val) => {
        return `\t\t'${val}': function(){
            require.ensure([], (a) => {
            var reactCom = require('bus/${val}/index')['default'];
            Actions(this).changeCom(reactCom);
            }, 'bus/${val}/index');
        }`;
    }).join(',\n');


    var str = `
const RouterMap = {
    linksList: [
${linksListStr}
    ],
    rule: {
${ruleStr}
    }
}

export default RouterMap;

`

    fs.writeFile('src/js/entry/routerMap.js', str);
    console.log('buildEntry ok.');

});

























