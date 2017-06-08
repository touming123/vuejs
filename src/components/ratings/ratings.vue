<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="tittle">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="tittle">服务态度</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.serviceScore"></star>
            </div>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="tittle">商品评价</span>
            <div class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </div>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="tittle">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :onlyContent="onlyContent" :selectType="selectType" @select="changeSelectType" @toggle="toggleOnlyContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="show(rating)" class="rating-item">
            <div class="avatar-wrapper">
              <img class="avatar" :src="rating.avatar">            
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-time">
                <div class="star-wrapper">
                  <star :size="36" :score="rating.score"></star>
                </div>
                <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="rateTime">{{rating.rateTime|formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/formatDate.js';

  const ERR_OK = 0;
  const ALL = 2;

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
        ratings: [],
        onlyContent: true,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },

    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },

    methods: {
      changeSelectType(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },

      toggleOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },

      show(rating) {
        if (this.onlyContent && !rating.text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === rating.rateType;
        }
      }
    },

    filters: {
      formatDate(time) {
        return formatDate(time, 'YYYY-MM-DD hh:mm');
      }
    },

    components: {
      star,
      split,
      ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .ratings
    position: fixed
    top: 174px
    bottom: 58px
    width: 100%
    overflow: hidden// 固定大小
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width:320px) //适配iPhone5
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .tittle
          margin-bottom: 8px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 12px
        .rankRate
          margin-bottom: 6px
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
      .overview-right
        flex: 1
        padding: 0 24px
        @media only screen and (max-width:320px)
          padding:0 0 0 6px
        .score-wrapper
          font-size: 0
          line-height: 18px
          &:not(:last-child)
            margin-bottom: 8px
          .tittle
            display: inline-block
            margin-right: 12px
            vertical-align: top
            font-size: 12px            
            color: rgb(7, 17, 27)
          .star-wrapper
            display: inline-block
            vertical-align: top
          .score
            display: inline-block            
            margin-left: 12px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
          .time
            display: inline-block  
            vertical-align: top
            font-size: 12px                    
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        &:not(:last-child)
          border-1px(rgba(7, 17, 27, 0.1))
        .avatar-wrapper
          flex: 0 0 28px
          width: 28px
          height: 28px
          border-radius: 50%
          margin-right: 12px
          .avatar
            width: 28px
            height: 28px
            border-radius: 50%
        .content
          flex: 1
          position: relative
          .name
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
            margin-bottom: 4px
          .star-time
            margin-bottom: 6px
            font-size: 0
            .star-wrapper
              display: inline-block
              vertical-align: top
            .time
              display: inline-block
              margin-left: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 18px
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .recommend
            .icon
              font-size: 12px
              line-height: 16px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(183, 187, 191)
            .recommend-item
              display: inline-block
              margin-left: 8px
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              background-color: #fff
          .rateTime
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
</style>
