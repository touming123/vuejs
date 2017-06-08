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

## vue
1. 无法操作不存在的对象属性，无法给其赋值
使用vue.set接口

## 开发
1. localhost->ip config :草料二维码
2. 实现真正的1px
3. 增大点击区域： padding
4. display:inline-block一定要font-size=0,vertical-algin:top
5. transition在vue中使用
name="", name-enter,name-enter-active

## vue组件通信

## better-scroll
1. 默认阻止click等
2. 



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

```js
import goods from "";

export default{
  components: {
    'goods': goods
  }
}
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

# 八.商品详情页
food.vue
1. 顶部正方形
width: 100%
height: 0
padding-bottom: 100%
2. 使用cartcontrol组件
3. 设置购物车transition消失，以便小球做抛物线
4. 增加split组件
5. 增加ratingselect组件
默认值
传参，因为会重复调用组件，参数要重置，不然上次选择影响本次
子组件事件派发给父组件
6. better-scroll
this.$nextTick()中触发refresh()
7. 更新dom操作也要再来this.$nextTick()中
8. 计算时间
new Date()
正则匹配，test,replace

# 九
1. 高度固定，相对于视口
只有固定了高度，才可以使用better-scroll进行滚动
2. 组件外层最好包一层wrapper，使用wrapper进行块级或者行级展示，位置等
3. nextTick
4. filters
5. &:not(:last-child)
6. absolute相对于非static祖先元素的padding-box定位