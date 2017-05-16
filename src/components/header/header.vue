<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar" />
      </div>
      <div class="content">
        <div class="tittle">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :src="seller.supports[0].type"></span>
          <span class="text">
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-tittle"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" />
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main"></div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin";

.header
  position: relative
  font-weight: 200
  color: rgb(255,255,255)
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      display: inline-block
      font-size: 16px
      margin-left: 16px
      .tittle 
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          line-height: 18px
          font-size: 16px
          font-weight: bold

      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
      
      .support
        margin-bottom: 2px
        font-size: 0
        .icon
          display: inline-block
          width: 12px
          height: 12px
          vertical-align: bottom
          bg-image('decrease_1')
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          margin-left: 4px
          line-height: 12px
          font-size: 10px
    .support-count
      height: 24px
      box-sizing: border-box
      position: absolute
      right: 12px
      bottom: 18px
      padding: 0 8px
      border-radius: 14px
      background-color: rgba(0, 0, 0, 0.2)
      .count
        line-height: 12px
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 24px 0 12px
    font-size: 0
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7, 17, 27, 0.2)
    .bulletin-tittle
      display: inline-block
      width: 22px
      height: 11px
      vertical-align: sub
      bg-image('bulletin')
      background-size: 22px 11px
      background-repeat: no-repeat
    .bulletin-text
      margin: 0 4px
      height: 28px
      line-height: 28px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      right: 12px
      bottom: 0
      line-height: 24px
      font-size: 10px

  .background
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: -1
    filter: blur(10px)// 模糊
    img
      width: 100%
      height: 100%
  .detail
    position: fixed //相对于视口定位
    width: 100%
    height: 100%
    top: 0
    left: 0
    overflow: hidden
    background-color: rgba(7, 17, 27, 0.5)
    
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px // sticky footer，需要配合清除浮动
    
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      .icon-close
        line-height: 32px
        font-size: 32px
</style>
