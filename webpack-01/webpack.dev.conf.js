const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: "localhost",
        open: true,
        port: 9999
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});