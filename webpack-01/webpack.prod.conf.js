const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].[contenthash].css',
        }),
        // 使用cssnano配置规则
        // 先 npm i cssnano -D
        new OptimizeCssAssetsPlugin({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),

            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: { removeAll: true }, //对注释的处理
                    normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                }]
            },
            canPrint: true  // 是否打印编译过程中的日志
        })
    ]
});