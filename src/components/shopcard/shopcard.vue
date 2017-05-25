<template>
  <div class="shopcard">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totolCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totolCount>0}"></i>
          </div>
          <div class="count" v-show="totolCount>0">{{totolCount}}</div>
        </div>
        <div class="curPrice">￥{{totolPrice}}</div>
        <div class="needPrice">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="delivery" :class="{'highlight': totolPrice>=seller.minPrice}">{{payPrice}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type: Object
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  computed: {
    totolPrice() {
      let totolPrice = 0;
      this.selectFoods.forEach((food) => {
        totolPrice += food.price * food.count;
      });
      return totolPrice;
    },
    totolCount() {
      let totolCount = 0;
      this.selectFoods.forEach((food) => {
        totolCount += food.count;
      });
      return totolCount;
    },
    payPrice() {
      if (this.totolPrice === 0) {
        return `￥${this.seller.minPrice}元起送`;
      } else if (this.totolPrice < this.seller.minPrice) {
        return `还差￥${this.seller.minPrice - this.totolPrice}起送`;
      } else {
        return `去结算`;
      }
    }
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
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: rgba(255, 255, 255, 0.4)
              &.highlight
                color: rgb(255, 255, 255)
          .count
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            border-radius: 6px
            line-height: 16px
            text-align: center
            font-size: 9px
            font-weight: 700
            color: rgb(255, 255, 255)
            background-color: rgb(240, 20, 20)
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
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
        .delivery
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background-color: #2b333b          
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
            background-color: #00b43c          
            
</style>

