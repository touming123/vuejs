## webpack
1. stylus
>Module build failed: Error: Cannot find module 'stylus'

webpack 里面用了 stylus-loader 但是 loader 没有找到你的 modules 安装了 stylus

npm install stylus --save-dev
npm install stylus-loader --save-dev

2. alias别名
webpack.base.conf.js
```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),//
      'components': path.resolve(__dirname, '../src/components')//使用components,而不再去寻找路径
    }
  },
```

## vue-router
1. 修改默认linkActiveClass

## vue-resource 封装ajax


## 开发
1. localhost->ip config :草料二维码
2. 实现真正的1px