<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(item, index) in goods" class="menu-item" 
          :class="{'current': currentIndex === index}" @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="foods in goods" class="foods-list" ref="foodsList">
          <h1 class="tittle">{{foods.name}}</h1>
          <ul class="foods">
            <li v-for="food in foods.foods" class="food-item" @click="selectFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="cur">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:add="addFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :seller="seller" :selectFoods="selectFoods"></shopcart>
    <food :food="selectedFood" ref="food" v-on:add="addFood"></food><!--@add自定义事件，子组件向父组件通信-->
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol,
      'food': food
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          // 判断scrollY的位置
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) { // cartcontrol组件中对food增添了count属性
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          // dom真正渲染的时机
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index) {
        this.foodsScroll.scrollToElement(this.$refs.foodsList[index], 300);
      },

      addFood(target) {
        this._drop(target);
      },

      selectFood(food) {
        this.selectedFood = food;
        this.$refs.food.show();
      },

      _drop(target) {
        // 优化体验，异步执行动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target); // this.$refs访问子组件
        });
      },

      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true, // betterscroll默认阻止click等事件
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          // Math.round取整数，Math.abs取绝对值
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },

      _calculateHeight() {
        let foodsList = this.$refs.foodsList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodsList.length; i++) {
          height += foodsList[i].clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.goods
  display: flex
  position: absolute
  width: 100%
  top: 174px
  bottom: 58px
  overflow: hidden
  .menu-wrapper
    width: 80px
    background-color: #f3f5f7
    .menu
      width: 100%
      .menu-item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        font-size: 0
        &.current
          position: relative // 上移1px，遮住上面的border-1px
          margin-top: -1px
          z-index: 10
          background-color: #fff
          .text
            font-weight: 700
            border-none() // display:none
        &:last-child
          .text
            border-none()
        .text
          display: table-cell
          vertical-align: middle
          line-height: 14px
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 2px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')

  .foods-wrapper
    flex: 1
    .foods-list
      .tittle
        padding-left: 14px
        line-height: 26px
        font-size: 12px
        border-left: 2px solid #d9dde1
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .foods
        padding: 0 18px
        background-color: #fff
        .food-item
          display: flex
          position: relative
          padding: 18px 0
          font-size: 0
          &:not(:last-child)
            border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            width: 57px
            margin-right: 10px
            vertical-align: top
          .content
            display: inline-block
            flex: 1
            margin-top: 2px
            color: rgb(147, 153, 159)
            .name
              margin: 2px 0 8px 0
              line-height: 14px
              font-size: 13px
              color: rgb(7, 17, 27)
            .description
              line-height: 10px
              font-size: 10px
              margin-bottom: 8px
            .extra
              line-height: 10px
              font-size: 10px
              .sellCount
                margin-right: 12px
            .price
              line-height: 24px
              font-weight: 700
              .cur
                font-size: 14px
                color: rgb(240, 20, 20)
                margin-right: 8px
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 12px
</style>
