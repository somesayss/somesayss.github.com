
// 依赖 
const webpack = require('webpack');
const config = require('./serverConfig');
const ES5to3OutputPlugin = require('es5to3-webpack-plugin');

const lessUse = config.module.rules[1].use;
lessUse.shift();
lessUse[0].options.build = true;

//这个使用uglifyJs压缩你的js代码
config.plugins.push( new webpack.optimize.UglifyJsPlugin({
    // minimize: true,
    compress: {
        warnings: false
    }
}) );

// ES3
config.plugins.push( new ES5to3OutputPlugin() );


module.exports = config;