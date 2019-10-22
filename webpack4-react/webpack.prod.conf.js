const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除打包文件工具

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩去重
module.exports = merge(common, {
    mode: 'production',
    devtool: "source-map",
    //代码分割 https://juejin.im/post/5b99b9cd6fb9a05cff32007a
    optimization: {
        splitChunks: {
            chunks: 'initial',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
        }
    },
    plugins: [
        //清除之前之前打包的旧文件
        new CleanWebpackPlugin(), 
        //打包体积优化，详细分布查看插件
        new BundleAnalyzerPlugin(),
        //用于优化或者压缩CSS资源
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    { discardComments: { removeAll: true } }
                ],
            },
            canPrint: true
        })
    ]
});