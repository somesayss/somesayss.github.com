/**
 * 2015,05,11
 */
module.exports = function(grunt) {
    
    //依赖
    var fs = require('fs'),
        path = require("path");
    // 
    var uglifyRex = /(.*)\.(.*)/;   //过滤 dist/js/libs/main.js => dist/js/libs/main.min.js

    //seaJS的配置项
    var seaCfgUrl = 'src/js/libs/seaCfg.js';

    //自助打包的JS
    var uglifyCfg = {
        js: [{
            outerUrl: 'dist/js/libs/main-require.js',
            list: [
                'src/js/libs/jquery.js',
                'src/js/libs/require.js',
                'src/js/libs/requireCfg.js'
            ]
        }, {
            outerUrl: 'dist/js/libs/main-sea.js',
            list: [
                'src/js/libs/jquery.js',
                'src/js/libs/sea.js',
                'src/js/libs/seaCfg.js'
            ]
        }],
        css: {
            outerUrl: 'dist/css/main.css',
            list: [
                'src/css/reset.css',
                'src/css/globe.css',
                'src/css/main.css'
            ]
        }
    }

    //转换
    function uglifyUtil(list){
        var noMin = {},
            min = {};
        [].concat(list).forEach(function(val){
            noMin[val.outerUrl] = val.list;
            min[val.outerUrl.replace(uglifyRex, '$1.min.$2')] = val.list;
        });
        return [noMin, min];
    }



    var uglifyJS = uglifyUtil(uglifyCfg.js),
        uglifyCSS = uglifyUtil(uglifyCfg.css);

    //seaJS配置项的读取
    function readSeaConfig(){
        var cont = fs.readFileSync(path.join(__dirname, seaCfgUrl), 'utf8');
        cont = cont.match(/alias[\s\S]+?({[\s\S]*?})/)[1];
        return new Function('return '+cont)();
    }
    var alias = readSeaConfig();

    // 项目配置(任务配置)
    grunt.initConfig({
        // 读取我们的项目配置并存储到pkg属性中
        pkg: grunt.file.readJSON('package.json'),
        // 通过watch任务，来监听文件是否有更改
        watch: {
            options: {
                spawn: false
            },
            // 监听less文件夹里面的文件
            sass: {
                files: ['src/css/**/*.scss'],
                tasks: ['sass']
            },
            // 监听react文件
            react: {
                files: ['src/js/**/*.jsx'],
                tasks: ['babel'],
            },
            // 监听babel
            babel: {
                files: ['src/js/**/*.babel'],
                tasks: ['babel']
            }
        },
        // 编译sass
        sass: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['**/*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        //JS打包配置
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //压缩任务
            compress: {
                options: {
                    mangle: true    //混淆变量(默认不混淆)
                },
                files: uglifyJS[1],
            },
            //合并任务
            Packaged: {
                options: {
                    beautify: true,  //美化(默认是不美化)
                    preserveComments: 'all' //注释是否保留(默认是删除)
                },
                files: uglifyJS[0]
            },
            //打包seajs
            missionSeajs: {
                files: [{
                    expand:true,
                    cwd:'dist/js', //js目录下
                    src:'**/main.js', //所有js文件
                    dest: 'dist/js' //输出到此目录下
                }]
            }
        },
        //CSS打包配置
        cssmin: {
            compress: {
                files: uglifyCSS[1]
            }
        },
        //seajs CMD提取
        transport: {
            options: {
                paths: ['src/js'],
                alias: alias
                // aliasPaths: '/src/js/'

            },
            missionMain: {
                files: [  
                    {  
                        cwd: 'src/js', //目标地址
                        src: ['common/**/*.js', 'modules/**/*.js', 'bus/**/*.js'], //目标文件
                        dest: 'dist/js/', //编译地址
                        expand: true
                    }  
                ]  
            }
        },
        //seajs CMD合并
        concat: {
            options: {
                paths: ['dist/js'],
                include: "all",
            },
            mission: {
                files: [
                    {
                        cwd: 'dist/js', //目标地址
                        src: ['common/**/*.js', 'modules/**/*.js', 'bus/**/*.js'], //需要合并的文件
                        dest: "dist/js",
                        expand: true
                        // ext: ".js",
                        // filter: "isFile"
                    }
                ]
            }
        },
        clean: {
            js: [
                'dist/js/**/*.js',
                '!dist/js/libs/*.js',
                '!dist/js/modules/**/main.js',
                '!dist/js/modules/**/main-debug.js',
                '!dist/js/bus/**/main.js',
                '!dist/js/bus/**/main-debug.js'
            ]
        },
        browserSync: {
            bsFiles: {
                src : [
                    'src/css/**/*.css',
                    'src/js/**/*.js',
                    'src/html/**/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './'
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015', 'react']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['**/*.babel', '**/*.jsx'],
                    dest: 'src/js',
                    ext: '.js'
                }]
            }
        }
    }); // grunt.initConfig配置完毕
 
    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    //js打包
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //css打包
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //清除
    grunt.loadNpmTasks('grunt-contrib-clean');
    //seajs
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    // less
    grunt.loadNpmTasks('grunt-contrib-less');
    // sass
    grunt.loadNpmTasks('grunt-contrib-sass');
    // react
    grunt.loadNpmTasks('grunt-react');
    // browsersync
    grunt.loadNpmTasks('grunt-browser-sync');
    // 预编译
    grunt.loadNpmTasks('grunt-babel');

    //普通打包
    grunt.registerTask('default', ['transport', 'concat', 'clean', 'uglify', 'cssmin']);
    //seajs
    grunt.registerTask('seajs', ['transport', 'concat']);
    // 静态服务
    grunt.registerTask('brow', ['browserSync', 'watch']);
    // 
    grunt.registerTask('ba', ['babel']);


};