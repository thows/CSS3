<template>
  <div class="news-list">
    <div class="header-bar">
      <i class="icon-back" @click="back"></i>
      <h1>{{handleTitle()}}</h1>
    </div>

    <div class="news-main">
      <div v-if="articles!==null" class="project" v-for="(article,index) in articles" :key="article.id">
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
              <img v-lazy="handleImgUrl(article.iconUrl)"/>
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

    <div class="bottom-back" @click="back" v-if="showBottom"></div>

  </div>

</template>

<script>
  import tool from "../../../api/tool";
  import moment from 'moment'

  export default {
    data() {
      return {
        articles: null,
        host: tool.oos(),
        page: 1,
        topArticle: null,
        isMore: false,
        moreText:'查看更多',
        isIcon: true,
        title: '',
        showBottom:false,

      };
    },
    methods: {
      back() {
        window.history.back()
      },
      loadMore() {
        if(!this.isIcon){
          return
        }
        let param = tool.buildForm([
          { key: "current", v: this.page },
          { key: "size", v: 10 },
          { key: "articleCid", v: this.$route.query.cid},
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
              if(this.articles.length != res.data.data.total){
                this.moreText='查看更多'
              }else{
                this.moreText='没有更多了'
                this.isIcon = false;
              }
            }
            this.page = this.page + 1;
          });
      },
      handleImgUrl(url){
        if(url.indexOf('.') == -1 && url.indexOf('http') == -1 && url.indexOf('com') == -1){
          return this.host + url;
        }
        return url;
      },
      handleTitle(){
        //渲染title
        if(this.$route.query.cid == '1'){
          return '国际';

        }else if(this.$route.query.cid == '2'){
          return '知识';

        }else if(this.$route.query.cid == '3'){
          return 'e点新能源';

        }else if(this.$route.query.cid == '4'){
          return '投融资';

        }else if(this.$route.query.cid == '5'){
          return 'CIRI动态';

        }
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
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 200){
          this.showBottom = true;
        }else{
          this.showBottom = false;
        }

      },
    },
    mounted() {
      this.loadMore();
      window.addEventListener('scroll', this.handleScroll);//检测滚动条事件
    },
    created(){},
    updated() {},
    filters: {
      time(time) {
        return moment(time).format("YYYY-MM-DD");
      }
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

  .header-bar {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    text-align: center;
    position: relative;
    @include onepx('bottom');
    h1 {
      font-size: 20px;
    }
    .icon-back {
      display: block;
      position: absolute;
      left: 0;
      width: 22px;
      height: 22px;
      margin: 11px auto;
      @include bg-image("../../base/header-bar/icon-arrow_lift");
      background-size: 22px auto;
    }

  }

  .news-main {
    text-align: left;
    h2 {
      font-size: 15px;
      color: #333;
      height: 40px;
      line-height: 22px;
      overflow: hidden;
      margin: 10px;
    }
    .title-box {
      font-size: 11px;
      color: #666;
      height: 10px;
      padding: 5px 10px 15px;
      .column {
        color: #3f83e6;
      }
      .news-time{
        display: inline-block;
        width: 12px;
        height: 12px;
        @include bg-image("../img/news-time");
        background-size: 12px auto;
        background-repeat: no-repeat;
        background-position: center center;
      }
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
        @include bg-image("../img/more");
        background-size: 12px auto;
        margin-left: 6px;
      }
    }
    .blank{
      height:25px;
    }
  }
  .bottom-back{
    position: fixed;
    bottom: 17px;
    left: 10px;
    width: 47px;
    height: 47px;
    @include bg-image("../img/bottom-back");
    background-size: 100% 100%;
  }


</style>
