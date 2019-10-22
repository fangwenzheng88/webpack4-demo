const presets = [
    [
        "@babel/preset-env",
        {
            modules: false,
            targets: {
                browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
            },
            useBuiltIns: "usage",
            corejs: 3,
        }
    ],
    "@babel/preset-react"
];

const plugins = [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-transform-runtime",
    ["import", {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": true
    }, "ant"],
    "@babel/plugin-proposal-optional-chaining"    
];

module.exports = { presets, plugins };