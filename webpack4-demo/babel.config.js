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
        },
    ],
];

const plugins = [
    "@babel/plugin-transform-runtime"
];

module.exports = { presets, plugins };