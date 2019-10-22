const merge = require('webpack-merge');
const common = require('./webpack.base.conf.js');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        host: "localhost",
        open: false,
        port: 8081,
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/page1/, to: '/pages/test_demo_01/test_demo_01.html' },
                { from: /^\/page2/, to: '/pages/test_demo_02/test_demo_02.html' },
                { from: /./, to: '/pages/test_demo_01/test_demo_01.html' },
            ]
        }
    }
});