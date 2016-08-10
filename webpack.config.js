/**
 * 2015,05,11
 */

const 
    path = require('path'),
    webpack = require('webpack');

module.exports = {
    watch: true,
    devtool: 'source-map',
    resolve: {
        alias: {
            'class': path.join(__dirname, 'src/js/common/class')
        },
        root: [
          path.join(__dirname, "src/js")
        ],
    },
    externals: {
        '$': 'jQuery'
    },
    module: {
        loaders:[{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    plugins: [
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({
            // minimize: true,
            compress: {
                warnings: false
            }

        })
    ]
};