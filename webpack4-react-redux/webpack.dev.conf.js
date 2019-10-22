const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: "localhost",
        open: false,
        port: 9999,
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/page1/, to: '/pages/page1/index.html' },
                { from: /./, to: '/pages/page1/index.html' },
            ]
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
});