const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: devMode ? "[name].[hash:8].js" : "js/[name].[contenthash:8].js",
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 拆分前必须共享模块的最小块数。
            minSize: 30000,
            // maxSize享有比更高的优先权maxInitialRequest/maxAsyncRequests。实际优先级为maxInitialRequest/maxAsyncRequests < maxSize < minSize。
            maxSize: 0,
            // 拆分前必须共享模块的最小块数。
            minChunks: 1,
            // 按需加载时最大并行请求数
            maxAsyncRequests: 5,
            // 入口点的最大并行请求数。
            maxInitialRequests: 3,
            // 指定用于生成名称的定界符
            automaticNameDelimiter: '~',
            // 允许设置由生成的块名称的最大字符数
            automaticNameMaxLength: 30,
            name: true,
            // 缓存组可以继承和/或覆盖splitChunks.*;中的任何选项
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
            }
        },
        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk: {
            name: "manifest"
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name(file) {
                                if (devMode) {
                                    return '[name].[ext]';
                                }

                                return '[name].[contenthash:8].[ext]';
                            },
                            outputPath: 'images',
                            publicPath: '../images'
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                if (devMode) {
                                    return '[name].[ext]';
                                }

                                return '[name].[contenthash:8].[ext]';
                            },
                            outputPath: 'fonts'
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
        new HtmlWebpackPlugin({ // 打包输出HTML
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',
            template: path.join(__dirname, './src/index.html')
        })
    ]
};