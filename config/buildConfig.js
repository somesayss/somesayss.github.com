
// 依赖 
const webpack = require('webpack');
const config = require('./serverConfig');
const ES5to3OutputPlugin = require('es5to3-webpack-plugin');


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