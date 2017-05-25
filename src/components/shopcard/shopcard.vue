<template>
  <div class="shopcard">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="curPrice">￥0</div>
        <div class="needPrice">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="delivery">￥{{seller.minPrice}}起送</div>
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
    };
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  
  .shopcard
    position: fixed
    width: 100%
    height: 48px
    left: 0
    bottom: 0
    z-index: 50
    .content
      display: flex
      .content-left
        flex: 1
        font-size: 0
        background-color: #141d27
        .logo-wrapper
          display: inline-block
          position: relative
          width: 56px
          height: 55px
          top: -10px
          box-sizing: border-box
          margin: 0 12px
          padding: 6px
          border-radius: 50%
          margin-left: 12px
          vertical-align: top
          background-color: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            vertical-align: top
            text-align: center            
            background-color: #2b343c
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
        .curPrice
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          line-height: 24px
          font-size: 16px
          font-weight: 700
          color: rgb(255, 255, 255, 0.4)
        .needPrice
          display: inline-block
          vertical-align: top
          margin-top: 12px
          margin-left: 12px
          line-height: 24px
          font-size: 16px
          color: rgb(255, 255, 255, 0.4)        
      .content-right
        width: 105px
        background-color: #2b333b
        .delivery
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)

</style>

