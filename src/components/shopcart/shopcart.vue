<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="toggleList">
          <div class="logo" :class="{'highlight': totolCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight': totolCount>0}"></i>
          </div>
          <div class="count" v-show="totolCount>0">{{totolCount}}</div>
        </div>
        <div class="curPrice">￥{{totolPrice}}</div>
        <div class="needPrice">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="delivery" :class="{'highlight': totolPrice>=seller.minPrice}" @click="pay">{{payPrice}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div><!--hook表明是被js选中-->
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="tittle">购物车</h1>
          <span class="empty" @click="clear">清空</span>
        </div>
        <div class="list-content" ref="cartList">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <div class="name">{{food.name}}</div>
              <div class="price">￥{{food.price*food.count}}</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

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
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
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
      },
      listShow() {
        if (!this.totolCount) {
          this.fold = true;
          return;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.listScroll) {
              this.listScroll = new BScroll(this.$refs.cartList, {
                click: true
              });
            } else {
              this.listScroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        // console.log(el);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },

      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; // 手动触发浏览器重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },

      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },

      toggleList() {
        if (!this.totolCount) {
          return;
        }
        this.fold = !this.fold;
      },

      hideList() {
        this.fold = true;
      },

      clear() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },

      pay() {
        if (this.totolPrice < this.seller.minPrice) {
          return;
        }
        alert(`支付${this.totolPrice}元`);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
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

    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      z-index: -1      
      width: 100%
      left: 0
      top: 0
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        padding: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        background-color: #f3f5f7
        .tittle
          display: inline
          line-height: 40px
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          padding-left: 10px 
          line-height: 40px
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden //固定大小
        background-color: #fff
        .food
          display: flex
          position: relative
          box-sizing: border-box
          height: 48px
          padding: 12px 0
          &:not(:last-child)
            border-1px(rgba(7, 17, 27, 0.1))            
          .name
            flex: 1
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            margin: 0 12px 0 18px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          // .cartcontrol-wrapper
    .list-mask
      position: fixed
      z-index: -2
      width: 100%
      top: 0
      left: 0
      bottom: 0
      backdrop-filter: blur(10px)
      background-color: rgba(7, 17, 27, 0.6)
      &.mask-enter-active, &.mask-leave-active
        transition: all 0.5s
      &.mask-enter, &.mask-leave-active
        opacity: 0
</style>

