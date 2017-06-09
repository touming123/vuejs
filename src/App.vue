<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" :seller="seller">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" :seller="seller">商家</router-link>
      </div>
    </div>
    <keep-alive><!--把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染-->
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  import {urlParse} from './common/js/util.js';

  const ERR_OK = 0;
  
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let query = urlParse();
            return query.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app 
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
