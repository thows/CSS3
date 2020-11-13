<!-- news -->

<template>
  <div class="news bg-blank">
    <div class="header">资讯</div>
    <div class="main">
      <!-- 轮播图 -->
      <div class="slider" id="slider1">
        <mt-swipe :auto="4000" @change="handleChange" :prevent="false">
          <mt-swipe-item v-for="item in swipeObj" :key="item.id">
            <router-link   :to="{path:'/news/news-detail/',query: {id: item.id}}" style="background: rgba(51,51,51,.5)">
              <img v-lazy="handleImgUrl(item.iconUrl)">

              <div class="bg-slider">
                <p id="slider2">{{item.title}} </p>
              </div>
            </router-link>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!--分类导航-->
      <div class="news-nav clearfix">
        <div class="nav-item fl" @click="toNewsList(1);">
          <img src="./img/nav-international.png"/>
          <p>国际</p>
        </div>
        <div class="nav-item fl" @click="toNewsList(2);">
          <img src="./img/nav-knowledge.png"/>
          <p>知识</p>
        </div>
        <div class="nav-item fl" @click="toNewsList(3);">
          <img src="./img/nav-energy.png"/>
          <p>E点新能源</p>
        </div>
        <div class="nav-item fl" @click="toNewsList(4);">
          <img src="./img/nav-invest.png"/>
          <p>投融资</p>
        </div>
        <div class="nav-item fl" @click="toNewsList(5);">
          <img src="./img/nav-dynamic.png"/>
          <p>CIRI动态</p>
        </div>
      </div>
      <cross-line></cross-line>

      <!--资讯列表-->
      <div class="project" v-for="(article,index) in articles" :key="index">
        <router-link :to="{path:'/news/news-detail/',query: {id: article.id}}">
          <div  v-if="(index+1)%5!==0" class="project2">
            <div class="fl main-news">
              <h2>{{article.title}}</h2>
              <div class="title-box">
                <span>{{article.categoryName}}</span>
                <span>{{handleTime(article.updateTime)}}</span>
                <span>{{article.publisher}}</span>
              </div>
            </div>
            <div class="fr img-warp">
              <div class="img">
                <img v-lazy="handleImgUrl(article.iconUrl)"/>
              </div>
            </div>
          </div>
          <div v-if="(index+1)%5===0" class="project1">
            <div class="img">
              <img v-lazy="handleImgUrl(article.iconUrl)" alt=""/>
            </div>
            <h2>{{article.title}}</h2>
            <div class="title-box">
              <span>{{article.categoryName}}</span>
              <span>{{handleTime(article.updateTime)}}</span>
              <span>{{article.publisher}}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="more">
        <span @click='loadMore' v-text="moreText">查看更多</span><i v-show="isIcon"></i>
      </div>
      <div class="blank"></div>
    </div>

    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/base/tab-bar/tab-bar'
  import CrossLine from '@/components/base/cross-line/cross-line'
  import tool from "@/api/tool";
  import moment from 'moment'

  export default {
    components: {
      TabBar,
      CrossLine
    },
    data() {
      return {
        host: tool.oos(),
        swipeObj: [],
        page: 1,
        articles: null,
        moreText: '查看更多',
        isIcon: true,
        weekTotal:0,//投融资总数据
        translate: null,
        timeFlag:true,
      };
    },
    computed: {
    },
    watch: {
    },
    methods: {
      handleChange(index) {},
      loadMore() {
        if(!this.isIcon){
          return
        }
        let param = tool.buildForm([
          { key: "current", v: this.page },
          { key: "size", v: 10 },
          { key: "articleCid", v: '' }
        ]);
        this.axios
          .post(tool.domind() + "/gateway/app/article/getActicleListInfoByCategory", param)
          .then(res => {
            if (res.data.code === 200) {
              if (this.page === 1 || this.articles == null) {
                this.articles = res.data.data.records;
              } else {
                this.articles = this.articles.concat(res.data.data.records);
              }
              if(this.articles.length < res.data.data.total){
                this.moreText='查看更多'
              }else{
                this.moreText='没有更多了';
                this.isIcon = false;
              }
            }
            this.page = this.page + 1;
          });
      },
      //列表页
      toNewsList(id){
        this.$router.push({path:'/news/news-list',query: {cid: id}});
      },
      handleImgUrl(url){
        if(url.indexOf('.') == -1 && url.indexOf('http') == -1 && url.indexOf('com') == -1){
          return this.host + url;
        }
        return url;
      },
      //格式化时间
      time(time) {
        return moment(time).format("YYYY-MM-DD");
      },
      handleTime(t){
        let current = new Date().getTime();
        let ms = Math.abs(current-t);
        let hours = Math.floor(ms / 1000 / 60 / 60);

        if(hours<24){
          return hours + '小时前';
        }else if(hours>=24 && hours<48){
          return '1天前';
        }else if(hours>=48 && hours<72){
          return '2天前';
        }else{
          return this.time(t);
        }
      },

    },
    mounted() {
      this.axios
        .get(tool.domind() + "/gateway/app/article/getTopTitleList?number="+ '4')
        .then(res => {
          if (res.data.code === 200) {
            this.swipeObj = res.data.data;
          }
        });
      this.loadMore();
    },
    activated() {},
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD");
      },

    },
    destroyed() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~@/assets/scss/mixin.scss";
  @import "~@/assets/scss/reset.scss";
  @import "~@/assets/scss/const.scss";

  .header{
    height:44px;
    line-height: 44px;
    color:#333333;
    font-size: 20px;
    text-align: center;
    position: relative;
  }
  .main {
    text-align: left;
    .slider {
      touch-action: none;
      height: 245px;
      font-size: 30px;
      text-align: center;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      #slider2 {
        font-size: 16px;
        color: #fff;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        text-align: left;
        width: 260px;
        text-overflow:ellipsis;
        white-space : nowrap;
        overflow : hidden;
        z-index: 11;
      }
    }
    #slider1 {
      position: relative;
      .mint-swipe-indicators {
        right: 10px;
      }
      .bg-slider{
        background: rgba(0,0,0,.7);
        position:absolute;
        bottom: 0;
        left: 0;
        width:100%;
        height:35px;
        z-index: 10;
      }
    }
    #slider3 {
      padding-top: 17px;
      padding-bottom: 13px;
      .swiper-slide{width:110px; margin: 0 10px !important;}
      .invest-finance {
        width: 110px;
        height: 55px;
        padding-top: 20px;
        @include bg-image("./img/slider-bg");
        background-size: 110px auto;
        text-align: center;
        box-shadow: 0px 3px 7px #eee;
        h3 {
          font-size: 14px;
          color: #666;
          height: 35px;
          line-height: 35px;
          overflow: hidden;
        }
        .time {
          font-size: 11px;
          color: #3f83e6;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
      }
    }
    .cross-line {
      width: 100%;
      height: 10px;
      background-color: #f5f5f5;
    }
    .project {
      h2 {
        font-size: 16px;
        color: #333;
        height: 40px;
        line-height: 22px;
        overflow: hidden;
        margin: 10px;
      }
      .title-box {
        font-size: 0;
        padding: 22px 10px 15px;
        span{
          display: inline-block;
          margin-right: 10px;
          font-size: 12px;
          line-height: 12px;
          color: #999;
        }

      }
      .project1 {
        margin-top: 14px;
        .img {
          width: 100%;
          height: 210px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .title-box {
          padding: 12px 10px 15px;
          @include onepx("bottom");
        }
      }
      .project2 {
        overflow: hidden;
        clear: both;
        @include onepx("bottom");
        h2 {
          padding: 0;
          margin: 12px 0 12px;
        }
        .main-news {
          width: 59.4%;
          margin-left: 2.7%;
        }
        .title-box {
          padding-left: 0;
          padding-right: 0;
        }
        .img-warp {
          width: 31.2%;
          margin-right: 2.7%;
          margin-left: 4%;
          .img {
            width: 100%;
            height: 83px;
            border-radius: 3px;
            margin: 15px 0;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .more {
      font-size: 12px;
      color: #3f80e9;
      margin-top: 20px;
      text-align: center;

      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        @include bg-image("./img/more");
        background-size: 12px auto;
        margin-left: 6px;
      }
    }
    .blank{
      height:75px;
    }

    .news-nav{
      padding: 20px 0;
      .nav-item{
        width: 20%;
        text-align: center;
        &:first-child{
        }
        img{
          display: inline-block;
          width: 49.33%;
          height: auto;
        }
        p{
          padding-top: 10px;
          font-size: 13px;
          line-height: 13px;
          color: #333333;
        }

      }
    }

  }


</style>
