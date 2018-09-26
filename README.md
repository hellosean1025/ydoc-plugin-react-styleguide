# ydoc-plugin-react-styleguide

根据代码结构和注释，生成 react 组件文档，基于 [react-styleguide](https://github.com/styleguidist/react-styleguidist) 

### 快速开始

1.在项目目录下 install 插件：

```
npm install ydoc-plugin-react-styleguide

```

2.在项目根目录 ydoc.js 中配置插件参数：

```js
module.exports = {
  plugins: ['react-styleguide'],
  pluginsConfig: {
    "react-styleguide": reactStyleguideOptions
  }
```

> ydoc 配置文件必须使用 ydoc.js，不能使用 ydoc.json

`reactStyleguideOptions` 配置请查看[官方文档](https://react-styleguidist.js.org/docs/configuration.html)

3.在导航添加链接

打开 docs/NAV.md，添加以下markdown:

```markdown
* [组件](/react-components/index.html)
```

4. 编译静态文档
```
ydoc build
```

### 怎么启动文档热加载服务？

在 package.json  `scripts` 添加：

```
"scripts": {
  "docs": "ydoc serve & ydoc-plugin-react-styleguide",
}

```

启动文档服务：
```
npm run docs
```

### Config Example

```js
const webpackConfig = {
  devtool: 'inline-source-map',
  resolve:{
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use:   ['style-loader','css-loader'],
      },
      {
        test: /\.scss|sass$/,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/image/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 1,
              name: 'static/voice/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
}

module.exports = {
  plugins: ['react-styleguide'],
  pluginsConfig: {
    'react-styleguide': {
      components: './components/**/index.js', //组件文档路径
      //webpack配置
      webpackConfig 
    }
}
```