const glob = require('glob'); // 处理文件路径用到，很有用
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将打包后js自动引入html文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
// 多页面配置函数
const pagesSetting = () => {
    const entries = {};
    const htmlWebpackPlugins = [];
    const files = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
    files.forEach((file) => {
        const match = file.match(/\/pages\/(.*)\/(.*).js$/);
        const entry = match && match[1]; // 文件夹
        // 保存入口文件
        entries[entry] = file;
        //const htmlPath = path.resolve(file, '..');
        //console.log(chalk.red(`htmlPath:${htmlPath}`))
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `./src/pages/${entry}/index.html`),
            filename: `pages/${entry}/index.html`,
            chunks: [entry],
            inject: true, // 将js放在body底部
            minify: {
                collapseWhitespace: true, // 折叠标签空白
                minifyCSS: true,
                minifyJS: true
            }
        }));
    });
    return {
        entries,
        htmlWebpackPlugins
    }
};
const { entries, htmlWebpackPlugins } = pagesSetting();
module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "pages/[name]/[name].[hash:8].js",
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
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {
                                //'primary-color': '#1DA57A',
                                //'link-color': '#1DA57A',
                                //'border-radius-base': '2px',
                                // or
                                'hack': `true; @import "${path.resolve('./src')}\\less\\ant-theme.less";`, // Override with less file
                            },
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                    { loader: "postcss-loader" },
                    { loader: 'stylus-loader' }
                ]
            },
            {
                test: /\.(bmp|png|jpg|jpeg|ico|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 12, // 文件小于12kb，输出DataUrl
                            outputPath: 'assets/images', // 该路径相对于html输出路径
                            publicPath: '../../assets/images',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src', 'audio:src'],
                            minimize: false,
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|woff|svg|eot|ttf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                            limit: 1024 * 5,
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: 'pages/[name]/[name].[chunkhash:8].css',
        })
    ]
};