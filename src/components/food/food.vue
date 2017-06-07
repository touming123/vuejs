<template>
  <transition name="foodDetail">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="tittle">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"  @add="addFood"></cartcontrol>
          </div>
          <transition name="fade"><!--设置过渡，使得小球可以获取target位置-->
            <div class="buy" v-show="food.count === 0 || !food.count" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="tittle">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="tittle">商品评价</h1>
          <ratingselect @select="changeSelectType" @toggle="toggleOnlyContent" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/emcascript-6">
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import Vue from 'vue';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';

const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },

  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },

  computed: {

  },

  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      });
    },

    hide() {
      this.showFlag = false;
    },

    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);//
      this.$emit('add', event.target);
    },

    addFood(target) {
      this.$emit('add', target);
    },

    changeSelectType(type) {
      this.selectType = type;
    },

    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
    }
  },

  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl" 

  .food
    position: fixed
    width: 100%
    z-index: 30
    left: 0
    top: 0
    bottom: 48px
    background-color: #fff
    &.foodDetail-enter-active, &.foodDetail-leave-active
      transition: all 0.5s
    &.foodDetail-enter, &.foodDetail-leave-active
      opacity: 0
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-bottom: 100%
      img
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .tittle
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
      .buy
        position: absolute
        bottom: 18px
        right: 18px
        width: 74px
        height: 24px
        padding: 6px 0 
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        text-align: center
        color: rgb(255, 255, 255)
        line-height: 12px
        background-color: rgb(0, 160, 220)
    .info
      padding: 18px
      .tittle
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        margin: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .tittle
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27) 
</style>
