/**
 * [exports JS打包合并+CSS打包合并+require打包]
 * 2015,05,11
 */
module.exports = function(grunt) {
 
    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35729;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            connect.static(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览)
            connect.directory(options.base[0])
        ];
    };

    var uglifyRex = /(.*)\.(.*)/;   //过滤 dist/js/libs/main.js => dist/js/libs/main.min.js
    //requirejs的配置项目
    var requirejsCfg = {
        baseUrl: "src/js/",
        outerUrl: "dist/js/",
        rex: /src\/js\/(.*)\.js/, //过滤 src/js/main/test/test.js => main/test/test
        mainConfigFile: "src/js/libs/requireCfg.js"
    };
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

    function setRequireJS(){
        var config = {};   
        config['options'] = requirejsCfg;
        grunt.file.expand(requirejsCfg.baseUrl+'main/*/main.js').forEach(function(val){
            if(requirejsCfg.rex.test(val)){
                val = RegExp.$1;
                config[val] = {
                    options: {
                        name: val,
                        out: requirejsCfg.outerUrl+val+'.js'
                    }
                }
            }
        });
        return config;
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


    // 项目配置(任务配置)
    grunt.initConfig({
        // 读取我们的项目配置并存储到pkg属性中
        pkg: grunt.file.readJSON('package.json'),
        // 通过connect任务，创建一个静态服务器
        connect: {
            options: {
                // 服务器端口号
                port: 8000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: '.'
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },
        // 通过watch任务，来监听文件是否有更改
        watch: {
            client: {
                // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
                options: {
                    livereload: lrPort
                },
                // '**' 表示包含所有的子目录
                // '*' 表示包含所有的文件
                files: ['src/**/*']
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
            }
        },
        //CSS打包配置
        cssmin: {
            compress: {
                files: uglifyCSS[1]
            }
        },
        //合并
        concat: {
            Packaged: {
                files: uglifyCSS[0]
            }
        },
        //requireJS
        requirejs: setRequireJS()
    }); // grunt.initConfig配置完毕
 
    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //js打包
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //css打包
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //requireJS
    grunt.loadNpmTasks('grunt-contrib-requirejs');
 
    // 自定义任务
    grunt.registerTask('live', ['connect', 'watch']);
    //普通打包
    grunt.registerTask('default', ['uglify', 'cssmin', 'concat', 'requirejs']);


};