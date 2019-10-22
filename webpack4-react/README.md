<!-- TOC -->

- [1. 初始化项目](#1-初始化项目)
    - [1.1. 创建文件夹webpack4_demo，进入文件夹打开cmd命令行](#11-创建文件夹webpack4_demo进入文件夹打开cmd命令行)
    - [1.2. 输入`npm init` 初始化package.json](#12-输入npm-init-初始化packagejson)
    - [1.3. 安装依赖](#13-安装依赖)
        - [1.3.1. webpack-cli](#131-webpack-cli)
        - [1.3.2. webpack-merge](#132-webpack-merge)
    - [1.4. webpack4配置](#14-webpack4配置)
        - [1.4.1. 用更加快捷的mode模式来优化配置文件](#141-用更加快捷的mode模式来优化配置文件)
            - [1.4.1.1. 开启方式 1：直接在启动命令后加入参数](#1411-开启方式-1直接在启动命令后加入参数)
            - [1.4.1.2. 开启方式 2：可以在配置文件中加入一个mode属性：](#1412-开启方式-2可以在配置文件中加入一个mode属性)
            - [1.4.1.3. development模式下，将侧重于功能调试和优化开发体验，包含如下内容：](#1413-development模式下将侧重于功能调试和优化开发体验包含如下内容)
            - [1.4.1.4. production模式下，将侧重于模块体积优化和线上部署，包含如下内容：](#1414-production模式下将侧重于模块体积优化和线上部署包含如下内容)
        - [1.4.2. 移除`commonchunk`，使用`optimization`](#142-移除commonchunk使用optimization)
        - [1.4.3. `ExtractTextWebpackPlugin`调整，建议选用新的CSS文件提取插件`mini-css-extract-plugin`](#143-extracttextwebpackplugin调整建议选用新的css文件提取插件mini-css-extract-plugin)
    - [1.5. 引入bootstrap](#15-引入bootstrap)
        - [1.5.1. 导入预编译的Sass](#151-导入预编译的sass)
    - [1.6. 导入编译的CSS](#16-导入编译的css)
- [2. webpack项目添加react](#2-webpack项目添加react)
    - [2.1. 添加`@babel/preset-react`](#21-添加babelpreset-react)
    - [2.2. `@babel/plugin-proposal-class-properties`](#22-babelplugin-proposal-class-properties)
    - [2.3. 添加babel-loader中添加jsx](#23-添加babel-loader中添加jsx)
    - [2.4. 引入react](#24-引入react)
    - [2.5. 配置热加载](#25-配置热加载)
    - [2.6. 引入ant](#26-引入ant)
    - [2.7. React.lazy() 和 Suspense](#27-reactlazy-和-suspense)
        - [2.7.1. Suspense](#271-suspense)
        - [2.7.2. 在组件中使用错误边界](#272-在组件中使用错误边界)

<!-- /TOC -->

# 1. 初始化项目
## 1.1. 创建文件夹webpack4_demo，进入文件夹打开cmd命令行
## 1.2. 输入`npm init` 初始化package.json
```
{
  "name": "webpack4_demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
## 1.3. 安装依赖
```
npm i webpack webpack-cli -D // -D 即 -save-dev    版本4.x以上需要安装webpack-cli
npm i webpack-merge -D
npm i webpack-dev-server -D
```
### 1.3.1. webpack-cli

[webpack-cli](https://www.npmjs.com/package/webpack-cli)

`webpack CLI`提供了一组灵活的命令，供开发人员在设置自定义`webpack`项目时提高速度。

从`webpack v4`开始，`webpack`不再需要配置文件，但是开发人员经常希望根据其用例和需求创建更自定义的`webpack`配置。`webpack CLI`通过提供一组工具来改善自定义`Webpack`配置的设置，从而满足了这些需求。

### 1.3.2. webpack-merge

[webpack-merge](https://www.npmjs.com/package/webpack-merge)

`webpack-merge`提供了`merge`连接数组并合并对象以创建新对象的功能。如果遇到函数，它将执行它们，通过算法运行结果，然后将返回的值再次包装在函数中。

尽管此行为具有超出其用途，但在配置`webpack`时特别有用。每当您需要合并配置对象时，`webpack-merge`都会派上用场。

还有一个特定于`webpack`的合并变体，`merge.smart`该变体能够考虑到webpack的特定情况（即，它可以使加载程序定义变平）。

## 1.4. webpack4配置

### 1.4.1. 用更加快捷的mode模式来优化配置文件

`webpack4`中提供的`mode`有两个值：`development`和`production`，默认值是 `production`。`mode`是我们为减小生产环境构建体积以及节约开发环境的构建时间提供的一种优化方案，提供对应的构建参数项的默认开启或关闭，降低配置成本。

#### 1.4.1.1. 开启方式 1：直接在启动命令后加入参数
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

#### 1.4.1.2. 开启方式 2：可以在配置文件中加入一个mode属性：
```
module.exports = {
  mode: 'production' // development
};
```

#### 1.4.1.3. development模式下，将侧重于功能调试和优化开发体验，包含如下内容：

- 浏览器调试工具
- 开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制

#### 1.4.1.4. production模式下，将侧重于模块体积优化和线上部署，包含如下内容：

- 开启所有的优化代码
- 更小的bundle大小
- 去除掉只在开发阶段运行的代码
- Scope hoisting和Tree-shaking
- 自动启用uglifyjs对代码进行压缩

>webpack一直以来最饱受诟病的就是其配置门槛极高，配置内容复杂而繁琐，容易让人从入门到放弃，而它的后起之秀如rollup，parcel等均在配置流程上做了极大的优化，做到开箱即用，webpack在V4中应该也从中借鉴了不少经验来提升自身的配置效率，详见内容可以参考这篇文章[《webpack 4: mode and optimization》](https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a)


### 1.4.2. 移除`commonchunk`，使用`optimization`

最初，块（及其内部导入的模块）通过内部Webpack图形中的父子关系连接。将`CommonsChunkPlugin`被用来避免在这些重复的依赖，但进一步的优化是不可能的。

从`webpack v4`开始，`CommonsChunkPlugin`删除了，而改为`optimization.splitChunks`。

[SplitChunks插件](https://webpack.docschina.org/plugins/split-chunks-plugin/)

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

### 1.4.3. `ExtractTextWebpackPlugin`调整，建议选用新的CSS文件提取插件`mini-css-extract-plugin`
[MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)
```
npm install --save-dev mini-css-extract-plugin
```

该插件将`CSS`提取到单独的文件中。它为每个包含`CSS`的`JS`文件创建一个`CSS`文件。它支持`CSS`和`SourceMap`的按需加载。

它基于新的`webpack v4`功能（模块类型）构建，并且需要`webpack 4`正常工作。

与`extract-text-webpack-plugin`相比：

- 异步加载
- 没有重复的编译（性能）
- 更容易使用
- 特定于CSS

TODO：

- HMR支持


## 1.5. 引入bootstrap

[bootstrap官方文档](https://getbootstrap.com/docs/4.3/getting-started/webpack/)

```
npm install --save jquery popper.js
npm install bootstrap
```
`Bootstrap`依赖于`jQuery`和`Popper`，它们定义为`peerDependencies`，这意味着您必须确保将它们都添加到`package.json`

通过将以下行添加到应用的入口文件中（通常是`index.js`或`app.js`）来导入`Bootstrap`
```
import 'bootstrap';
```
或者，您可以根据需要分别导入插件：
```
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/alert';
```

### 1.5.1. 导入预编译的Sass

要充分发挥Bootstrap的潜力并根据需要对其进行自定义，请将源文件用作项目捆绑过程的一部分。

首先，创建您自己的文件，_custom.scss并使用它覆盖内置的自定义变量。然后，使用您的主Sass文件导入您的自定义变量，然后导入`Bootstrap`：

```
$primary:       #e95420 !default;
$secondary:     #0e8420 !default;
$success:       #fff !default;
$light:         #e8cd56 !default;
$dark:          #e95420 !default;

$input-bg: #c34113;
$input-border-color: #c34113;
$input-placeholder-color: #ccc;
$input-color: #fff;

$jumbotron-bg: rgb(247, 247, 247);

@import "~bootstrap/scss/bootstrap";
```

为了使`Bootstrap`进行编译，请确保安装并使用所需的加载程序：`sass-loader`，`postcss-loader`和`Autoprefixer`。通过最少的设置，您的`webpack`配置应包含此规则或类似规则：
```
...
{
  test: /\.(scss)$/,
  use: [{
    loader: 'style-loader', // inject CSS to page
  }, {
    loader: 'css-loader', // translates CSS into CommonJS modules
  }, {
    loader: 'postcss-loader', // Run postcss actions
    options: {
      plugins: function () { // postcss plugins, can be exported to postcss.config.js
        return [
          require('autoprefixer')
        ];
      }
    }
  }, {
    loader: 'sass-loader' // compiles Sass to CSS
  }]
},
...
```

## 1.6. 导入编译的CSS

另外，您可以通过将Bootstrap的现成CSS添加到项目的入口点来使用它：

```
import 'bootstrap/dist/css/bootstrap.min.css';
```

在这种情况下，您可以使用现有规则，css而无需对webpack配置进行任何特殊修改，除非您不需要`sass-loader`仅`style-loader`和`css-loader`。

```
...
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
...
```

# 2. webpack项目添加react

[https://www.html.cn/archives/9436](https://www.html.cn/archives/9436)

## 2.1. 添加`@babel/preset-react`

[https://www.babeljs.cn/docs/babel-preset-react](https://www.babeljs.cn/docs/babel-preset-react)
```
npm install --save-dev @babel/preset-react
```
```
//babel.config.js
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement
        "pragmaFrag": "DomFrag", // default is React.Fragment
        "throwIfNamespace": false // defaults to true
      }
    ]
  ]
}
```
![](https://raw.githubusercontent.com/fangwenzheng88/git_picture/master/img/20191012145636.jpg)


## 2.2. `@babel/plugin-proposal-class-properties`
```
npm install --save-dev @babel/plugin-proposal-class-properties

//babel.config.js
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

## 2.3. 添加babel-loader中添加jsx
```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
 ...
};
```

## 2.4. 引入react
```
npm install --save react react-dom
```

修改`index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);
```

## 2.5. 配置热加载
```
npm install --save-dev react-hot-loader
```

修改`webpack.config.js`
```

const webpack = require('webpack');

module.exports = {
  ...
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
  ...
};
```

修改`index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

+ module.hot.accept();
```

## 2.6. 引入ant

```
npm install antd --save
```

```
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```
自定义antd主题
```
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader', // translates CSS into CommonJS
    }, {
      loader: 'less-loader', // compiles Less to CSS
+     options: {
+       modifyVars: {
+         'primary-color': '#1DA57A',
+         'link-color': '#1DA57A',
+         'border-radius-base': '2px',
+         // or
+         'hack': `true; @import "${path.resolve('./src')}\\ant-theme.less";`, // Override with less file
+       },
+       javascriptEnabled: true,
+     },
    }],
    // ...other rules
  }],
  // ...other config
}
```
`ant-theme.less`
```
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@success-color: #52c41a; // 成功色
@warning-color: #faad14; // 警告色
@error-color: #f5222d; // 错误色
@font-size-base: 14px; // 主字号
@heading-color: rgba(0, 0, 0, 0.85); // 标题色
@text-color: rgba(0, 0, 0, 0.65); // 主文本色
@text-color-secondary : rgba(0, 0, 0, .45); // 次文本色
@disabled-color : rgba(0, 0, 0, .25); // 失效色
@border-radius-base: 4px; // 组件/浮层圆角
@border-color-base: #d9d9d9; // 边框色
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
```

5. 添加react-router
```
npm install --save react-router-dom
```

## 2.7. React.lazy() 和 Suspense

[参考文章](http://www.ptbird.cn/react-lazy-suspense-error-boundaries.html)

`React.lazy()`

动态 import 主要应用场景是延迟加载方法，对于组件来说，并不是很适用，但是 React.lazy 对于组件的加载则是有比较大的帮助。
> 目前明确指出，React.lazy 和 suspense 并不适用于服务端渲染

之前代码
```
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
之后：
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

### 2.7.1. Suspense ##
```
import React, { Component, Suspense } from 'react';
```

既然是延迟加载，就会有一个加载过程，之前在渲染的时候，我们基本都是自顶一个一个 `<Loading>` 组件，然后通过变量控制进行操作，如果加载完成，则取消掉 `<Loading>` 组件。

如果直接使用 `React.lazy`，会报错误：需要一个 `placeholder ui`
![](https://raw.githubusercontent.com/fangwenzheng88/git_picture/master/img/20191014155626.png)
既然是延迟加载，就一定会有一个`loading`的过程，而 `Suspense` 正是完成这个过程。

### 2.7.2. 在组件中使用错误边界 ##
```
import React, {Component} from 'react';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

export default Error;

```

```
//app.js

<Error>
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Redirect from="/" exact to="/food" />
            <Route path="/food" component={Food} />
            <Route path="/wiki" component={Wiki} />
            <Route path="/profile" component={Profile} />
            <Route component={Page404} />
        </Switch>
    </Suspense>
</Error
```

```
//Wiki.js

render() {
  throw new Error('I crashed!');
  return (
    <div>
      <p>{this.state.title}</p>
    </div>
  );
}
```

![](https://raw.githubusercontent.com/fangwenzheng88/git_picture/master/img/20191014162254.png)
