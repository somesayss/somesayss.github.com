
// 依赖 
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const rootPath = __dirname.match(/(.*?)config/)[1];
const entry = {};

glob.sync('src/js/entry/**/main.js').forEach((files) => {
    entry[files.match(/src\/(.*)\.js/)[1]] = path.join(rootPath, files);
});

module.exports = {
    devtool: 'source-map',
    resolve: {
        // 别名
        alias: {
            'common': path.join(rootPath, 'src/js/common/'),
            'bus': path.join(rootPath, 'src/js/bus/'),
            'modules': path.join(rootPath, 'src/js/modules/')
        }
    },
    entry: entry,
    output: {
        filename: '[name].js', 
        chunkFilename:'js/[name].js',
        path: path.join(rootPath, 'dist'),
        publicPath: '/dist/' //访问路径
        // publicPath: 'http://localhost:3000/dist/' //访问路径
    },
    // 全局变量
    externals: {
        '$': 'jQuery',
        'react': 'React',
        'reactDOM': 'ReactDOM',
        'limit': 'limit'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.join(rootPath, 'src/js/'),
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=imgs/[name].[ext]'
        }]
    },
    plugins: [],
    devServer: {
        host: '0.0.0.0',
        port: '3000',
        inline: true
    }
};















