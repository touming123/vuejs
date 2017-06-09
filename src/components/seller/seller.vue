<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc">
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="rating-count">({{seller.ratingCount}})</span>
          <span class="sell-count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="delivery">
          <div class="item">
            <div class="tittle">起送价</div>
            <div class="text">
              <span class="price">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="item">
            <div class="tittle">商家配送</div>
            <div class="text">
              <span class="price">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="item">
            <div class="tittle">平均配送时间</div>
            <div class="text">
              <span class="time">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="tittle">公告与活动</h2>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul>
          <li class="support-item" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="tittle">商家实景</h2>
        <div class="content" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic" v-for="pic in seller.pics">
              <img width="120" height="90" :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <h2 class="tittle">商家信息</h2>
        <ul>
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>        
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';

  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },

    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },

    created() {
      // 此时dom并没有渲染出来,无法new BScroll
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },

    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },

    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },

    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },

      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, // 横向滚动
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },

      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },

    components: {
      star,
      split
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .seller
    position: fixed
    top: 174px
    bottom: 58px
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 0 18px
      .name
        margin-top: 18px
        margin-bottom: 8px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .desc
        font-size: 0
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .star-wrapper
          display: inline-block
          margin-right: 8px
          vertical-align: top
        .rating-count, .sell-count
          display: inline-block
          vertical-align: top
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
        .rating-count
          margin-right: 12px
      .delivery
        display: flex
        padding: 18px 0
        .item
          flex: 1
          text-align: center
          &:not(:last-child)
            border-right: 1px solid rgba(7, 17, 27, 0.1)
          .tittle
            margin-bottom: 4px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .text
            font-size: 10px
            line-height: 24px            
            color: rgb(7, 17, 27)
            .price, .time
              font-size: 24px
      .favorite
        position: absolute
        width: 50px
        top: 0
        right: 11px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0 18px
      .tittle
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .content-wrapper
        padding: 8px 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .support-item
        padding: 16px 12px
        font-size: 0
        &:not(:last-child)
          border-1px(rgba(7, 17, 27, 0.1))          
        .icon
          display: inline-block
          width: 16px
          height: 16px
          margin-right: 6px
          vertical-align: top
          background-size: 16px 16px 
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          dislay: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 16px
          color: rgb(7, 17, 27)

    .pics
      padding: 18px
      .tittle
        margin-bottom: 12px      
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .content
        width: 100%
        overflow: hidden
        white-space: nowrap// 不折行
        .pic-list
          font-size: 0
          .pic
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin-right: 0
    .infos
      padding: 18px
      .tittle
        padding-bottom: 12px
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .info
        padding: 16px 12px
        font-size: 12px
        line-height: 16px
        color: rgb(7, 17, 27)
        &:not(:last-child)
          border-1px(rgba(7, 17, 27, 0.1))          
</style>
