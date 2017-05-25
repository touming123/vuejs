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

## vue-components
1. 注册组件
**组件传参：props接收参数**
```js
Vue.component('goods', {
   props:['detail'],
   template:`<div class="goods">`
})
```

```html
<template>
  <div class="goods"></div>
</template>

<script>
export default{
  props: {
    detail: {// 指定接收参数名，类型，默认值
      type: Number,
      default: 0
    }
  }
}
</script>

```
2. 创建vue实例，挂载
**组件传参：数据存储**

```js
let vm = new Vue({
  el: "#app",
  data: {
    seller:{} //数据存储在data中
  }
});
```

3. 使用组件
**组件传参：html中使用：传参**
```html
 <div id="app">
    <goods :detail="article"></goods>
 </div>
```

```js
<goods></goods>
```