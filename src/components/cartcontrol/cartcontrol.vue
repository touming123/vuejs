<template>
  <div class="cartcontrol">
    <transition name="show">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="subFood"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop="addFood"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food);
    },
    methods: {
      addFood(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count += 1;
        }
        this.$emit('add', event.target);
      },
      subFood(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count -= 1;
      }
    }
  };
</script>
<style lang="stylus" rel="styleheet/stylus">
  .cartcontrol
    font-size: 0      
    .cart-decrease
      display: inline-block
      padding: 6px      
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      transition: all 0.4s linear
      &.show-enter-active, &.show-leave-active
        transition: all 0.4s linear
      &.show-enter, &.show-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0) rotate(180deg)

    .cart-count
      display: inline-block
      width: 12px
      height: 24px
      padding-top: 6px
      line-height: 24px
      text-align: center
      vertical-align: top
      font-size: 12px
      color: rgb(147, 153, 159)      
    .cart-increase
      display: inline-block
      padding: 6px      
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      
</style>

