# ydoc-plugin-react-styleguide

According to code structure and comments, generate react component documentation, based on [react-styleguide](https://github.com/styleguidist/react-styleguidist) 

### Guide

1.Install：

```
npm install ydoc-plugin-react-styleguide

```

2. ydoc.js ：

```js
module.exports = {
  plugins: ['react-styleguide'],
  pluginsConfig: {
    "react-styleguide": reactStyleguideOptions
  }
```

> ydoc config file must use ydoc.js，not ydoc.json

`reactStyleguideOptions` [The official documentation](https://react-styleguidist.js.org/docs/configuration.html)

3.add link

open docs/NAV.md， add markdown:

```markdown
* [component](/react-components/index.html)
```

4. build html
```
ydoc build
```

### How do I start the document hot load service？

在 package.json  `scripts` add：

```
"scripts": {
  "docs": "ydoc serve & ydoc-plugin-react-styleguide",
}

```

start document server：
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
      components: './components/**/index.js',
      //webpack config
      webpackConfig 
    }
}
```
