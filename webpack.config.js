
// 依赖 
const path = require('path');
const webpack = require('webpack');

function setConfig(watch, min){
    var config = {
        devtool: 'source-map',
        resolve: {
            // 别名
            alias: {
                'limit': path.join(__dirname, 'src/js/common/limit')
            },
            // 跟目录，所有的地址从这里出发
            root: [
                path.join(__dirname, 'src/js')
            ],
        },
        output: {
            publicPath: '/dist/' //访问路径
        },
        // 全局变量
        externals: {
            '$': 'jQuery',
            'react': 'React',
            'reactDOM': 'ReactDOM',
            'limit': 'limit'
        },
        module: {
            loaders:[{
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.less$/,
                loader: 'style!css!less'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=imgs/[name].[ext]'
            }]
        },
        plugins: [],
    };

    if(watch){
        // 默认存在观察者
        config.watch = true;
    };

    if(min){
        config.plugins = [
            //这个使用uglifyJs压缩你的js代码
            new webpack.optimize.UglifyJsPlugin({
                // minimize: true,
                compress: {
                    warnings: false
                }
            })
        ]
    };

    return config;
};

// 统一打包的JS
setConfig.commonJsList = [
    'src/js/libs/jquery.js',
    'src/js/libs/react.js',
    'src/bower_components/limit/dist/limit.min.js',
    'src/js/libs/sea.js',
    'src/js/libs/seaCfg.js'
];

// 统一打包的CSS
setConfig.commonCssList = [
    'src/bower_components/limitCss/dist/reset.min.css',
    'src/bower_components/limitCss/dist/global.min.css'
];

// 整个文件夹移动
setConfig.staticList = [
    'imgs'
];

module.exports = setConfig;















